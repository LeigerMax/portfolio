"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

export function CameraManager({ isUIVisible }: { isUIVisible: boolean }) {
  const { camera } = useThree();
  const timeline = useRef<gsap.core.Timeline>(null!);

  useEffect(() => {
    // Si on passe en mode libre (isUIVisible === false), on tue le scroll
    if (!isUIVisible) {
      if (timeline.current) {
        timeline.current.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
      return;
    }

    // Sinon, on initialise le parcours guidé (ScrollTrigger)
    const cameraPoints = {
      hero: { 
        pos: new THREE.Vector3(0, 9, 16),
        lookAt: new THREE.Vector3(0, 3, -2)
      },
      whoami: { 
        pos: new THREE.Vector3(-6, 7, 10),
        lookAt: new THREE.Vector3(-14.8, 7, 8)
      },
      parcours: { 
        pos: new THREE.Vector3(-4, 7, 3),
        lookAt: new THREE.Vector3(-14.8, 6, -5)
      },
      skills: { 
        pos: new THREE.Vector3(-4, 8, 5),
        lookAt: new THREE.Vector3(-11.5, 7, -10)
      },
      certs: { 
        pos: new THREE.Vector3(0, 8, -2),
        lookAt: new THREE.Vector3(0, 6, -14.8)
      },
      projects: { 
        pos: new THREE.Vector3(0, 2.9, -1.8),
        lookAt: new THREE.Vector3(0, 2.95, -2.8)
      },
      contact: { 
        pos: new THREE.Vector3(6, 5, 6),
        lookAt: new THREE.Vector3(2.2, 2.3, 0.6)
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

    // On définit les étapes du tour
    timeline.current
      .to(cameraTarget, {
        x: cameraPoints.whoami.pos.x, y: cameraPoints.whoami.pos.y, z: cameraPoints.whoami.pos.z,
        lx: cameraPoints.whoami.lookAt.x, ly: cameraPoints.whoami.lookAt.y, lz: cameraPoints.whoami.lookAt.z,
        duration: 1, ease: "power2.inOut"
      })
      .to(cameraTarget, {
        x: cameraPoints.parcours.pos.x, y: cameraPoints.parcours.pos.y, z: cameraPoints.parcours.pos.z,
        lx: cameraPoints.parcours.lookAt.x, ly: cameraPoints.parcours.lookAt.y, lz: cameraPoints.parcours.lookAt.z,
        duration: 1, ease: "power2.inOut"
      })
      .to(cameraTarget, {
        x: cameraPoints.skills.pos.x, y: cameraPoints.skills.pos.y, z: cameraPoints.skills.pos.z,
        lx: cameraPoints.skills.lookAt.x, ly: cameraPoints.skills.lookAt.y, lz: cameraPoints.skills.lookAt.z,
        duration: 1, ease: "power2.inOut"
      })
      .to(cameraTarget, {
        x: cameraPoints.certs.pos.x, y: cameraPoints.certs.pos.y, z: cameraPoints.certs.pos.z,
        lx: cameraPoints.certs.lookAt.x, ly: cameraPoints.certs.lookAt.y, lz: cameraPoints.certs.lookAt.z,
        duration: 1, ease: "power2.inOut"
      })
      .to(cameraTarget, {
        x: cameraPoints.projects.pos.x, y: cameraPoints.projects.pos.y, z: cameraPoints.projects.pos.z,
        lx: cameraPoints.projects.lookAt.x, ly: cameraPoints.projects.lookAt.y, lz: cameraPoints.projects.lookAt.z,
        duration: 1, ease: "power2.inOut"
      })
      .to(cameraTarget, {
        x: cameraPoints.contact.pos.x, y: cameraPoints.contact.pos.y, z: cameraPoints.contact.pos.z,
        lx: cameraPoints.contact.lookAt.x, ly: cameraPoints.contact.lookAt.y, lz: cameraPoints.contact.lookAt.z,
        duration: 1, ease: "power2.inOut"
      });

    return () => {
      if (timeline.current) timeline.current.kill();
    };
  }, [camera, isUIVisible]);

  return !isUIVisible ? (
    <OrbitControls 
       enableDamping 
       dampingFactor={0.05} 
       rotateSpeed={0.5} 
       minDistance={2} 
       maxDistance={30} 
       maxPolarAngle={Math.PI / 1.8}
    />
  ) : null;
}
