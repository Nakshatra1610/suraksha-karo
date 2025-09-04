import { useState } from "react";
import { Smartphone, FileText, ArrowLeft, ChevronRight } from "lucide-react";
import { KYCMethod } from "../KYCApp";

interface MethodSelectionScreenProps {
  onNext: () => void;
  onBack: () => void;
  onMethodSelect: (method: KYCMethod) => void;
  selectedMethod?: KYCMethod;
}

export const MethodSelectionScreen = ({ 
  onNext, 
  onBack, 
  onMethodSelect, 
  selectedMethod 
}: MethodSelectionScreenProps) => {
  const [selected, setSelected] = useState<KYCMethod | undefined>(selectedMethod);

  const methods = [
    {
      id: "digilocker" as KYCMethod,
      title: "DigiLocker से",
      subtitle: "सरकारी डिजिटल दस्तावेज़",
      description: "आधार, पैन कार्ड सीधे DigiLocker से",
      icon: Smartphone,
      badge: "तेज़",
      badgeColor: "bg-success text-success-foreground",
      recommended: true
    },
    {
      id: "document" as KYCMethod,
      title: "दस्तावेज़ अपलोड करें",
      subtitle: "फोटो खींचकर अपलोड करें",
      description: "आधार, पैन, लाइसेंस, वोटर आईडी",
      icon: FileText,
      badge: "आसान",
      badgeColor: "bg-warning text-warning-foreground",
      recommended: false
    }
  ];

  const handleMethodSelect = (method: KYCMethod) => {
    setSelected(method);
    onMethodSelect(method);
  };

  const handleNext = () => {
    if (selected) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            सत्यापन का तरीका चुनें
          </h1>
          <p className="text-sm text-muted-foreground">
            आपके लिए सुविधाजनक विकल्प चुनें
          </p>
        </div>
      </div>

      {/* Method Options */}
      <div className="space-y-4">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = selected === method.id;
          
          return (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`w-full kyc-card hover:shadow-lg transition-all relative ${
                isSelected 
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background border-primary" 
                  : "hover:border-primary/30"
              }`}
            >
              {method.recommended && (
                <div className="absolute -top-2 right-4">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                    सुझाया गया
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-card-foreground">{method.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${method.badgeColor}`}>
                      {method.badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{method.subtitle}</p>
                  <p className="text-xs text-muted-foreground">{method.description}</p>
                </div>
                
                <div className={`transition-transform ${isSelected ? "rotate-90" : ""}`}>
                  <ChevronRight className={`w-5 h-5 ${
                    isSelected ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-card-foreground text-sm mb-2">
          ℹ️ जानकारी
        </h4>
        <p className="text-xs text-muted-foreground">
          दोनों तरीके समान रूप से सुरक्षित हैं। DigiLocker तेज़ है और मैन्युअल अपलोड में अधिक नियंत्रण मिलता है।
        </p>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleNext}
        disabled={!selected}
        className={`w-full py-4 px-6 rounded-lg font-semibold transition-all ${
          selected
            ? "kyc-button-primary"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        आगे बढ़ें
      </button>
    </div>
  );
};