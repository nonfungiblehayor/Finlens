
import React, { SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { Check, Upload, FileX } from 'lucide-react';
import { useAnalyzeDoc } from '@/utils/ai-model';
import { Analysis } from '@/types';
import mixpanel from 'mixpanel-browser';

interface FileUploadProps {
  onAnalysisComplete: React.Dispatch<SetStateAction<Analysis>>
  setStreamedText: React.Dispatch<SetStateAction<string>>
  streamedText: string
}

const FileUpload = ({ onAnalysisComplete, setStreamedText, streamedText }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileDetails, setFileDetails] = useState<{objective: string, fileString: string}>()
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    mixpanel.track('upload file', {
      'upload_file': 'File'
    })
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'text/csv' || 
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          selectedFile.type === 'application/vnd.ms-excel' ||
          selectedFile.name.endsWith('.pdf') || 
          selectedFile.name.endsWith('.csv') ||
          selectedFile.name.endsWith('.xlsx') ||
          selectedFile.name.endsWith('.xls')) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result
          if (typeof result === 'string') {
            const prefixPattern = /^data:[^;]+;base64,/;
            const base64 = result.replace(prefixPattern, '');
            setFileDetails((prev) => ({...prev, fileString: base64}))
          }
        };
        reader.readAsDataURL(selectedFile);
      } else {
        toast.error("Invalid file type")
      }
    }
  };

  const handleUpload = async () => {
    mixpanel.track('run analysis', {
      'run-analysis': 'Analysis'
    })
    if (!file) return;
    setStreamedText('');
    setIsUploading(true);
    setIsUploading(false);
    toast.success("Beginning analysis of your data...")
    setIsAnalyzing(true);
    try {
      await useAnalyzeDoc(
        file,
        fileDetails.objective,
        fileDetails.fileString,
        (chunk) => {
          if (chunk.fileId) {
            onAnalysisComplete((prev) => ({...prev, fileId: chunk.fileId}))
          }
          if (chunk.text) {
            setStreamedText((o) => o + chunk.text);
            onAnalysisComplete((prev) => ({...prev, report: streamedText}))
          }
        },
        (full) => {
          setIsAnalyzing(false);
          onAnalysisComplete((prev) => ({...prev, analysisState: true}))
        }
      );
    } catch (err) {
      toast.error("An error occured try again later")
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto glass-card animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Upload Your Data</CardTitle>
        <CardDescription className="text-center">
          Upload any dataset and get instant AI-powered analysis, interactive visualizations, and intelligent insights to drive better decisions.
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
            <label htmlFor="file-upload">
                  <Upload className="mb-4 h-10 w-10 cursor-pointer text-muted-foreground" />
            </label>
              <p className="mb-2 text-sm font-medium">
                Drag and drop your file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, CSV, Excel (.xlsx, .xls)
              </p>
              <Input
                type="file"
                className="hidden"
                id="file-upload"
                accept=".pdf,.csv,.xlsx,.xls,application/pdf,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
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
        
        <div className="space-y-2">
          <Label htmlFor="objective">Analysis Objective</Label>
          <Textarea
            id="objective"
            placeholder="Describe what you want to achieve with this analysis (e.g., identify spending patterns, find sales trends, analyze customer behavior...)"
            value={fileDetails?.objective}
            onChange={(e) => setFileDetails((prev) => ({...prev, objective: e.target.value}))}
            className="min-h-[80px] resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Help us understand your goals to provide more targeted insights
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleUpload}
          disabled={!file || !fileDetails?.objective?.trim() || isUploading || isAnalyzing}
        >
          {isUploading ? "Uploading..." : 
           isAnalyzing ? "Analyzing..." : 
           "Analyze Data"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUpload;
