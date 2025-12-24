import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./AboutIncand.css";

const AboutIncand: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const leftTriRef = useRef<HTMLImageElement>(null);
  const rightTriRef = useRef<HTMLImageElement>(null);
  const brochureRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    // INITIAL STATES
    gsap.set(contentRef.current, {
      opacity: 0,
      x: -140,
    });

    gsap.set(iconRef.current, {
      opacity: 0,
      y: 40,
    });

    gsap.set(brochureRef.current, {
      opacity: 1,
    });

    tl
      // TRIANGLES OPEN HORIZONTALLY (NO Y, NO SCALE)
      .to(
        leftTriRef.current,
        {
          x: "-18vw",
          duration: 1.2,
          ease: "power4.out",
        },
        0
      )
      .to(
        rightTriRef.current,
        {
          x: "18vw",
          duration: 1.2,
          ease: "power4.out",
        },
        0
      )

      // CONTENT SLIDES FROM BEHIND LEFT TRIANGLE
      .to(
        contentRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
        },
        0.35
      )

      // ICON STRIP
      .to(
        iconRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.8
      )

      // BROCHURE → TOP RIGHT (DESKTOP ONLY)
      .to(
        brochureRef.current,
        {
          opacity: 1,
          duration: 0.3,
        },
        0.6
      );

    const trigger = () => {
      tl.play();
      containerRef.current?.classList.add("is-active");
      window.removeEventListener("pointerdown", trigger);
    };

    window.addEventListener("pointerdown", trigger);

    return () => window.removeEventListener("pointerdown", trigger);
  }, []);

  return (
    <section ref={containerRef} className="about-container">
      <div className="bg-pattern" />

      <a
        ref={brochureRef}
        href="/assets/INCAND_Brochure.pdf"
        target="_blank"
        className="brochure-btn"
      >
        <img src="/assets/brochure.svg" className="brochure-svg" />
      </a>

      <div className="triangles">
        <img
          ref={leftTriRef}
          src="/assets/left-triangle.svg"
          className="triangle left-triangle"
        />
        <img
          ref={rightTriRef}
          src="/assets/right-triangle.svg"
          className="triangle right-triangle"
        />
      </div>

      <div className="content-wrapper">
        <div ref={contentRef} className="content-inner">
          <h2 className="main-title">
            About <br /> Us
          </h2>

          <p className="description">
            NIT Silchar’s cultural extravaganza invites you into a vibrant{" "}
            <span className="highlight">Tribal Tapestry</span> — a journey woven
            with ancient rhythms, timeless traditions, and stories passed
            through generations.
          </p>

          <div ref={iconRef} className="icon-strip">
            <img src="/assets/icon.svg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIncand;
