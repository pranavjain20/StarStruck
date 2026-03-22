import { useState } from "react";
import { Landing } from "./components/Landing/Landing";
import { PhotoUpload } from "./components/PhotoUpload/PhotoUpload";
import { ConnectAccounts } from "./components/ConnectAccounts/ConnectAccounts";
import { ProfileAnalysis } from "./components/ProfileAnalysis/ProfileAnalysis";
import { SwipeScreen } from "./components/SwipeScreen/SwipeScreen";

export default function App() {
  const [step, setStep] = useState(0);
  const [demoMode, setDemoMode] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [identifiers, setIdentifiers] = useState<Record<string, string | null>>({});

  if (step === 0) return (
    <Landing
      onCreateProfile={() => setStep(1)}
      onTryDemo={() => { setDemoMode(true); setUserName("Alex"); setStep(3); }}
    />
  );
  if (step === 1) return <PhotoUpload onContinue={(photos, name) => { setUserPhoto(photos[0] ?? null); setUserName(name); setStep(2); }} />;
  if (step === 2) return <ConnectAccounts onContinue={(ids, name, photo) => { setIdentifiers(ids); if (name) setUserName(name.split(" ")[0]); if (photo) setUserPhoto(photo); setStep(3); }} />;
  if (step === 3) return <ProfileAnalysis onContinue={() => setStep(4)} identifiers={identifiers} demoMode={demoMode} />;
  return <SwipeScreen userPhoto={userPhoto} userName={userName} />;
}
