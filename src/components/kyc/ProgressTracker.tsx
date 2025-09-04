interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

export const ProgressTracker = ({ currentStep, totalSteps, progress }: ProgressTrackerProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-foreground">
          Step {currentStep} / {totalSteps}
        </h2>
        <span className="text-xs text-muted-foreground">
          {Math.round(progress)}% Complete
        </span>
      </div>
      
      <div className="kyc-progress-bar">
        <div 
          className="kyc-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};