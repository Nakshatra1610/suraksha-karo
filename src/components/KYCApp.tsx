import { useState } from "react";
import { WelcomeScreen } from "./kyc/WelcomeScreen";
import { MethodSelectionScreen } from "./kyc/MethodSelectionScreen";
import { DocumentUploadScreen } from "./kyc/DocumentUploadScreen";
import { FaceAuthScreen } from "./kyc/FaceAuthScreen";
import { SuccessScreen } from "./kyc/SuccessScreen";
import { ProgressTracker } from "./kyc/ProgressTracker";

export type KYCStep = 
  | "welcome" 
  | "method-selection" 
  | "document-upload" 
  | "face-auth" 
  | "success";

export type KYCMethod = "digilocker" | "document";

export interface KYCData {
  method?: KYCMethod;
  documents?: File[];
  faceImage?: File;
  userInfo?: {
    name?: string;
    phone?: string;
  };
}

const KYCApp = () => {
  const [currentStep, setCurrentStep] = useState<KYCStep>("welcome");
  const [kycData, setKycData] = useState<KYCData>({});

  const steps: KYCStep[] = ["welcome", "method-selection", "document-upload", "face-auth", "success"];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const updateKYCData = (data: Partial<KYCData>) => {
    setKycData(prev => ({ ...prev, ...data }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "welcome":
        return <WelcomeScreen onNext={nextStep} />;
      
      case "method-selection":
        return (
          <MethodSelectionScreen
            onNext={nextStep}
            onBack={prevStep}
            onMethodSelect={(method) => updateKYCData({ method })}
            selectedMethod={kycData.method}
          />
        );
      
      case "document-upload":
        return (
          <DocumentUploadScreen
            onNext={nextStep}
            onBack={prevStep}
            method={kycData.method}
            onDocumentsUpload={(documents) => updateKYCData({ documents })}
          />
        );
      
      case "face-auth":
        return (
          <FaceAuthScreen
            onNext={nextStep}
            onBack={prevStep}
            onFaceCapture={(faceImage) => updateKYCData({ faceImage })}
          />
        );
      
      case "success":
        return <SuccessScreen data={kycData} />;
      
      default:
        return <WelcomeScreen onNext={nextStep} />;
    }
  };

  return (
    <div className="kyc-container">
      {currentStep !== "welcome" && currentStep !== "success" && (
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="container max-w-md mx-auto px-4 py-4">
            <ProgressTracker currentStep={currentStepIndex + 1} totalSteps={steps.length} progress={progress} />
          </div>
        </div>
      )}
      
      <main className="container max-w-md mx-auto px-4 py-6">
        {renderCurrentStep()}
      </main>
    </div>
  );
};

export default KYCApp;