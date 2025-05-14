
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Check, Upload, FileX } from 'lucide-react';

interface FileUploadProps {
  onAnalysisComplete: () => void;
}

const FileUpload = ({ onAnalysisComplete }: FileUploadProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if file is PDF or CSV
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'text/csv' || 
          selectedFile.name.endsWith('.pdf') || 
          selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or CSV bank statement.",
          variant: "destructive"
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsUploading(false);
    
    toast({
      title: "File uploaded successfully",
      description: "Beginning analysis of your statement...",
    });
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsAnalyzing(false);
    onAnalysisComplete();
    
    toast({
      title: "Analysis complete",
      description: "Your financial insights are ready!",
      variant: "default",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Upload Bank Statement</CardTitle>
        <CardDescription className="text-center">
          Upload your bank statement to get personalized financial insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 bg-muted/50">
          {file ? (
            <div className="flex flex-col items-center space-y-2">
              <Check className="h-10 w-10 text-green-500" strokeWidth={2} />
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setFile(null)}
                className="mt-2"
              >
                <FileX className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          ) : (
            <>
              <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="mb-2 text-sm font-medium">
                Drag and drop your file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, CSV
              </p>
              <Input
                type="file"
                className="hidden"
                id="file-upload"
                accept=".pdf,.csv,application/pdf,text/csv"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button 
                  variant="outline" 
                  className="cursor-pointer mt-4"
                  asChild
                >
                  <span>Select File</span>
                </Button>
              </label>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleUpload}
          disabled={!file || isUploading || isAnalyzing}
        >
          {isUploading ? "Uploading..." : 
           isAnalyzing ? "Analyzing..." : 
           "Analyze Statement"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUpload;
