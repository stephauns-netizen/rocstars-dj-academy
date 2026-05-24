'use client';

// ============================================================
//  Live content layer.
//  Reads admin overrides from Firestore (settings/media,
//  settings/courses) and merges them over the data.ts defaults.
//  The site always renders defaults first (SSR + first paint),
//  then patches in any saved overrides after mount — so it stays
//  fast and never breaks if Firestore is unreachable.
// ============================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { IMAGES, COURSES, type Course } from './data';

export type ImageMap = Record<string, string>;

export type CourseOverride = Partial<
  Pick<
    Course,
    'priceTTD' | 'durationWeeks' | 'perWeek' | 'schedule' | 'seatsLabel' | 'curriculum'
  >
>;
export type CourseOverrides = Record<string, CourseOverride>; // keyed by course slug

type ContentState = {
  images: ImageMap;
  courses: Course[];
  loaded: boolean;
};

const DEFAULT_IMAGES = { ...(IMAGES as ImageMap) };

const ContentContext = createContext<ContentState>({
  images: DEFAULT_IMAGES,
  courses: COURSES,
  loaded: false,
});

function mergeImages(data: ImageMap): ImageMap {
  const merged: ImageMap = { ...DEFAULT_IMAGES };
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === 'string' && v.trim()) merged[k] = v;
  }
  return merged;
}

function mergeCourses(ov: CourseOverrides): Course[] {
  return COURSES.map((c) => {
    const o = ov[c.slug];
    if (!o) return c;
    return {
      ...c,
      ...(typeof o.priceTTD === 'number' && o.priceTTD > 0 ? { priceTTD: o.priceTTD } : {}),
      ...(typeof o.durationWeeks === 'number' && o.durationWeeks > 0
        ? { durationWeeks: o.durationWeeks }
        : {}),
      ...(typeof o.perWeek === 'number' && o.perWeek > 0 ? { perWeek: o.perWeek } : {}),
      ...(o.schedule && o.schedule.trim() ? { schedule: o.schedule } : {}),
      ...(o.seatsLabel && o.seatsLabel.trim() ? { seatsLabel: o.seatsLabel } : {}),
      ...(Array.isArray(o.curriculum) && o.curriculum.length
        ? { curriculum: o.curriculum }
        : {}),
    };
  });
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageMap>(DEFAULT_IMAGES);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [mediaSnap, coursesSnap] = await Promise.all([
          getDoc(doc(db, 'settings', 'media')),
          getDoc(doc(db, 'settings', 'courses')),
        ]);
        if (cancelled) return;
        if (mediaSnap.exists()) setImages(mergeImages(mediaSnap.data() as ImageMap));
        if (coursesSnap.exists())
          setCourses(mergeCourses(coursesSnap.data() as CourseOverrides));
      } catch {
        // Keep defaults on any error (offline / rules / etc.)
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ContentContext.Provider value={{ images, courses, loaded }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useImages(): ImageMap {
  return useContext(ContentContext).images;
}

export function useCourses(): Course[] {
  return useContext(ContentContext).courses;
}

export function useContentLoaded(): boolean {
  return useContext(ContentContext).loaded;
}

// ---- Admin writes (called from the protected admin pages) ----

export async function saveMedia(map: ImageMap) {
  return setDoc(doc(db, 'settings', 'media'), map, { merge: true });
}

export async function saveCourses(overrides: CourseOverrides) {
  return setDoc(doc(db, 'settings', 'courses'), overrides, { merge: true });
}

export async function fetchMediaOverrides(): Promise<ImageMap> {
  const snap = await getDoc(doc(db, 'settings', 'media'));
  return snap.exists() ? (snap.data() as ImageMap) : {};
}

export async function fetchCourseOverrides(): Promise<CourseOverrides> {
  const snap = await getDoc(doc(db, 'settings', 'courses'));
  return snap.exists() ? (snap.data() as CourseOverrides) : {};
}
