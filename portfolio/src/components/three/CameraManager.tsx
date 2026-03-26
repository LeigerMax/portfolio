"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export function CameraManager() {
  const { camera } = useThree();
  const timeline = useRef<gsap.core.Timeline>(null!);

  useEffect(() => {
    const cameraPoints = {
      hero: { 
        pos: new THREE.Vector3(0, 8, 16), 
        lookAt: new THREE.Vector3(0, 2, -2) 
      },
      skills: { 
        pos: new THREE.Vector3(-4, 7, 5), 
        lookAt: new THREE.Vector3(-11.5, 6, -10) 
      },
      certs: { 
        pos: new THREE.Vector3(0, 6, -4), 
        lookAt: new THREE.Vector3(0, 4.5, -14.8) 
      },
      projects: { 
        pos: new THREE.Vector3(0, 1.9, -1.8), 
        lookAt: new THREE.Vector3(0, 1.95, -2.8) 
      },
      contact: { 
        pos: new THREE.Vector3(6, 4, 6), // Reculé et déporté à droite
        lookAt: new THREE.Vector3(2.2, 1.3, 0.6) 
      },
    };

    const cameraTarget = {
      x: cameraPoints.hero.pos.x,
      y: cameraPoints.hero.pos.y,
      z: cameraPoints.hero.pos.z,
      lx: cameraPoints.hero.lookAt.x,
      ly: cameraPoints.hero.lookAt.y,
      lz: cameraPoints.hero.lookAt.z,
    };

    timeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: 2.5,
      },
      onUpdate: () => {
        camera.position.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
        camera.lookAt(cameraTarget.lx, cameraTarget.ly, cameraTarget.lz);
      }
    });

    // Sequence 1: Hero -> Skills (Library)
    timeline.current.to(cameraTarget, {
      x: cameraPoints.skills.pos.x,
      y: cameraPoints.skills.pos.y,
      z: cameraPoints.skills.pos.z,
      lx: cameraPoints.skills.lookAt.x,
      ly: cameraPoints.skills.lookAt.y,
      lz: cameraPoints.skills.lookAt.z,
      duration: 1,
      ease: "power2.inOut"
    });

    // Sequence 2: Skills -> Certs (Wall)
    timeline.current.to(cameraTarget, {
      x: cameraPoints.certs.pos.x,
      y: cameraPoints.certs.pos.y,
      z: cameraPoints.certs.pos.z,
      lx: cameraPoints.certs.lookAt.x,
      ly: cameraPoints.certs.lookAt.y,
      lz: cameraPoints.certs.lookAt.z,
      duration: 1,
      ease: "power2.inOut"
    });

    // Sequence 3: Certs -> Projects (Screen)
    timeline.current.to(cameraTarget, {
      x: cameraPoints.projects.pos.x,
      y: cameraPoints.projects.pos.y,
      z: cameraPoints.projects.pos.z,
      lx: cameraPoints.projects.lookAt.x,
      ly: cameraPoints.projects.lookAt.y,
      lz: cameraPoints.projects.lookAt.z,
      duration: 1,
      ease: "power2.inOut"
    });

    // Sequence 4: Projects -> Contact (Phone)
    timeline.current.to(cameraTarget, {
      x: cameraPoints.contact.pos.x,
      y: cameraPoints.contact.pos.y,
      z: cameraPoints.contact.pos.z,
      lx: cameraPoints.contact.lookAt.x,
      ly: cameraPoints.contact.lookAt.y,
      lz: cameraPoints.contact.lookAt.z,
      duration: 1,
      ease: "power2.inOut"
    });

    return () => {
      if (timeline.current) timeline.current.kill();
    };
  }, [camera]);

  return null;
}
