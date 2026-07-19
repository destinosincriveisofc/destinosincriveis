"use client";

import { useEffect } from "react";
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

const VAPID_PUBLIC_KEY = "BDdKSUpIdhMv_jhpy1pl-JrMCAUN-208tdAsKOQNCPeaYYMMkc_R7A4SgB9D-x6bfltrAlqKJ5r8_yf06iDSOTM";
const SUBSCRIBE_URL = "https://destinosincriveis.vps-kinghost.net/api/push/subscribe";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.log("Service Worker or Push Notifications are not supported in this browser.");
      return;
    }

    async function registerPush() {
      try {
        const registration = await navigator.serviceWorker.ready;
        console.log("Service Worker is ready for Push Registration.");

        // Check current permission state
        let permission = Notification.permission;
        if (permission === "default") {
          permission = await Notification.requestPermission();
        }
        
        console.log("Notification permission status:", permission);
        if (permission !== "granted") {
          console.log("Permission for notifications was not granted.");
          return;
        }

        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        };

        let subscription = await registration.pushManager.getSubscription();
        
        if (!subscription) {
          subscription = await registration.pushManager.subscribe(subscribeOptions);
          console.log("New Push Subscription created:", subscription);
        } else {
          console.log("Existing Push Subscription found:", subscription);
        }

        const response = await fetchWithTimeout(SUBSCRIBE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription }),
        });

        if (response.ok) {
          console.log("Push subscription successfully saved on server.");
        } else {
          console.error("Failed to save push subscription on server:", await response.text());
        }
      } catch (error) {
        console.error("Error during Push Notification registration:", error);
      }
    }

    // Attempt to register after mounting
    registerPush();
  }, []);

  return null;
}
