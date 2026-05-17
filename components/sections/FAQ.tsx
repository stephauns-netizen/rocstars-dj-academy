'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { FAQ as FAQ_DATA } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <Container>
        <SectionHead
          eyebrow="FAQ"
          title={<>Questions <span className="gradient-text">answered.</span></>}
          body="Everything you need to know before you enrol. Don't see what you're looking for? Message us on WhatsApp."
        />
        <Reveal>
          <div className="grid gap-3 max-w-[880px] mx-auto">
            {FAQ_DATA.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={[
                    'border rounded overflow-hidden transition-all duration-300',
                    isOpen
                      ? 'border-violet/25 bg-gradient-to-b from-[#11111B] to-[#0A0A12]'
                      : 'border-line bg-gradient-to-b from-[#0D0D17] to-[#08080F]',
                  ].join(' ')}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left py-5.5 px-6.5 flex justify-between items-center gap-4.5 text-base text-white font-semibold cursor-pointer"
                    style={{ padding: '22px 26px' }}
                  >
                    <span>{f.q}</span>
                    <span
                      className={[
                        'flex-shrink-0 w-7 h-7 rounded-full border grid place-items-center transition-all duration-300',
                        isOpen ? 'rotate-[135deg] bg-grad border-transparent' : 'border-line-bright',
                      ].join(' ')}
                    >
                      <span className="text-white text-[18px] leading-none font-normal">+</span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6.5 pb-6 text-[#C9C9D6] text-[15px] leading-[1.65]" style={{ padding: '0 26px 24px' }}>
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
