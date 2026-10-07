import jsPDF from 'jspdf';
import { PlantDiagnosis } from '../types';

export function generateDiagnosisPdfReport(diagnosis: PlantDiagnosis): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor = [22, 101, 52]; // #166534 emerald-800
  const secondaryColor = [31, 41, 55]; // #1f2937 stone-800
  const accentColor = [234, 88, 12]; // orange for severity
  const lightBg = [243, 244, 246];

  let y = 18;

  // Header Bar
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('AgroVision AI - Plant Health Diagnostic Report', 14, 15);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('AI-Powered Crop Pathology & Agronomic Intelligence', 140, 15);

  y = 32;

  // Metadata Row
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Report ID:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(diagnosis.id, 35, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Generated On:', 120, y);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(diagnosis.timestamp).toLocaleString(), 148, y);

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.text('Inference Mode:', 14, y);
  doc.setFont('helvetica', 'normal');
  doc.text(diagnosis.mode === 'production' ? 'Production AI Inference' : 'High-Fidelity Agronomic Demo Model', 42, y);

  y += 6;
  doc.setDrawColor(220, 225, 230);
  doc.line(14, y, 196, y);
  y += 10;

  // Key Diagnosis Highlights (Two boxes)
  // Left Box: Plant & Disease
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(14, y, 88, 38, 3, 3, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CROP & PATHOLOGY', 18, y + 8);

  doc.setFontSize(9);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('Plant Identified:', 18, y + 16);
  doc.setFont('helvetica', 'normal');
  doc.text(`${diagnosis.plant.name} (${Math.round(diagnosis.plant.confidence * 100)}% conf)`, 48, y + 16);

  doc.setFont('helvetica', 'bold');
  doc.text('Diagnosis:', 18, y + 24);
  doc.setFont('helvetica', 'normal');
  doc.text(diagnosis.disease.name, 48, y + 24);

  doc.setFont('helvetica', 'bold');
  doc.text('Status:', 18, y + 32);
  doc.setFont('helvetica', 'normal');
  doc.text(diagnosis.disease.isHealthy ? 'Healthy - No Pathogen' : 'Infected - Action Required', 48, y + 32);

  // Right Box: Severity & Health Score
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(108, y, 88, 38, 3, 3, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('HEALTH METRICS', 112, y + 8);

  doc.setFontSize(9);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('AI Confidence:', 112, y + 16);
  doc.setFont('helvetica', 'normal');
  doc.text(`${Math.round(diagnosis.disease.confidence * 100)}%`, 146, y + 16);

  doc.setFont('helvetica', 'bold');
  doc.text('Disease Severity:', 112, y + 24);
  doc.setFont('helvetica', 'normal');
  doc.text(`${diagnosis.severity.level} (${diagnosis.severity.score}% surface)`, 146, y + 24);

  doc.setFont('helvetica', 'bold');
  doc.text('Plant Health Score:', 112, y + 32);
  doc.setFont('helvetica', 'normal');
  doc.text(`${diagnosis.healthScore} / 100`, 146, y + 32);

  y += 46;

  // Explainable AI - Detected Symptoms
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('1. Explainable AI - Detected Visual Symptoms', 14, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  
  const explanationLines = doc.splitTextToSize(diagnosis.explanation, 180);
  doc.text(explanationLines, 14, y);
  y += explanationLines.length * 4.5 + 3;

  diagnosis.symptoms.forEach((symptom) => {
    doc.text(`[+]  ${symptom}`, 18, y);
    y += 4.5;
  });

  y += 4;

  // Recommended Field Actions
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('2. Recommended Field Actions', 14, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('Immediate Interventions:', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  diagnosis.recommendations.immediateActions.forEach((act) => {
    const lines = doc.splitTextToSize(`•  ${act}`, 178);
    doc.text(lines, 18, y);
    y += lines.length * 4.2;
  });

  y += 2;
  doc.setFont('helvetica', 'bold');
  doc.text('Long-Term Cultural & Prevention Measures:', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  diagnosis.recommendations.longTermPrevention.forEach((prev) => {
    const lines = doc.splitTextToSize(`•  ${prev}`, 178);
    doc.text(lines, 18, y);
    y += lines.length * 4.2;
  });

  y += 4;

  // Microclimate Disease Risk
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('3. Microclimate & Weather Risk Assessment', 14, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text(
    `Local Temperature: ${diagnosis.weatherRisk.temperature}°C   |   Humidity: ${diagnosis.weatherRisk.humidity}%   |   Rainfall: ${diagnosis.weatherRisk.rainfall}mm   |   Risk Level: ${diagnosis.weatherRisk.riskLevel}`,
    14,
    y
  );
  y += 5;

  const weatherAdvice = doc.splitTextToSize(`Advisory: ${diagnosis.weatherRisk.advice}`, 180);
  doc.text(weatherAdvice, 14, y);
  y += weatherAdvice.length * 4.5 + 4;

  // Footer Disclaimer
  doc.setDrawColor(220, 225, 230);
  doc.line(14, 270, 196, 270);

  doc.setFontSize(7.5);
  doc.setTextColor(110, 115, 125);
  doc.text(
    'IMPORTANT DISCLAIMER: AgroVision AI is an educational decision-support tool. Predictions are not guaranteed to be 100% accurate. For serious crop pathology or chemical dosage, consult your local certified agricultural extension department and adhere strictly to product label instructions.',
    14,
    275,
    { maxWidth: 182 }
  );

  doc.text('AgroVision AI Platform · Intelligent Agronomic Solutions', 14, 287);
  doc.text('Page 1 of 1', 180, 287);

  // Save the PDF directly to client's download folder
  const safeFilename = `AgroVision_Report_${diagnosis.plant.name}_${diagnosis.disease.name.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.pdf`;
  doc.save(safeFilename);
}
