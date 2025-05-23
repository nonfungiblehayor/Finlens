import { jsPDF } from "jspdf";
import MarkdownIt from "markdown-it";
import html2canvas from "html2canvas";
import type { Chart as ChartJS, ChartOptions } from 'chart.js';

export const handleDownload = async (containerRef) => {
    const el = containerRef.current
    const canvas = await html2canvas(el, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdfHeight);
    pdf.save("analysis-result.pdf");
  };
export const handleDownloadChart = async(chartRef, title: string) => {
  console.log(chartRef)
  if (!chartRef.current) return;
    const url = chartRef.current.toBase64Image();
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title ?? 'chart'}.png`;
    link.click();
}
