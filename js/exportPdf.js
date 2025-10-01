window.exportMultipleDivsToPdf = function (divIds, fileName, filipinoData, englishData) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });

    // Set font
    pdf.setFont('Arial', 'normal');
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);

    // Filipino Summary (Page 1)
    let y = 40;
    pdf.text("Filipino Summary (Filipino Version)", 40, y);
    y += 30;
    pdf.setFontSize(14);
    pdf.text("Buod at Pagsusuri ng Pag-unlad ng mga Nag-aaral", 40, y);
    y += 30;
    pdf.setFontSize(12);
    pdf.text(`${filipinoData.frustration} (${filipinoData.frustrationPercent}%) - Frustration Level (Kailangang Gabayan)`, 40, y);
    y += 20;
    pdf.text("Kailangan nila ng mas maraming gabay at pagsasanay sa mga batayang kasanayan.", 40, y);
    y += 20;
    pdf.text(`${filipinoData.instructional} (${filipinoData.instructionalPercent}%) - Instructional Level (Nagsisimula/Umaasenso)`, 40, y);
    y += 20;
    pdf.text("Makakatulong ang dagdag na pagsasanay at self-paced learning para sa kanila.", 40, y);
    y += 20;
    pdf.text(`${filipinoData.independent} (${filipinoData.independentPercent}%) - Independent Level (Mahusay)`, 40, y);
    y += 20;
    pdf.text("Bigyan sila ng mas mahihirap na gawain at pagkakataong tumulong sa iba.", 40, y);
    y += 30;
    pdf.text(`Kabuuang mag-aaral: ${filipinoData.total}`, 40, y);

    // English Summary (Page 2)
    pdf.addPage();
    y = 40;
    pdf.setFontSize(18);
    pdf.text("English Summary", 40, y);
    y += 30;
    pdf.setFontSize(14);
    pdf.text("Summary & Analysis of Learner Progression", 40, y);
    y += 30;
    pdf.setFontSize(12);
    pdf.text(`${englishData.frustration} (${englishData.frustrationPercent}%) - Frustration Level (Needs Improvement)`, 40, y);
    y += 20;
    pdf.text("They likely need more guidance and basic skill-building to move forward.", 40, y);
    y += 20;
    pdf.text(`${englishData.instructional} (${englishData.instructionalPercent}%) - Instructional Level (Satisfactory/Progressing)`, 40, y);
    y += 20;
    pdf.text("These learners can benefit from more practice and self-paced learning to improve their skills.", 40, y);
    y += 20;
    pdf.text(`${englishData.independent} (${englishData.independentPercent}%) - Independent Level (Mastery/Excellent)`, 40, y);
    y += 20;
    pdf.text("They should be given advanced challenges and opportunities to mentor others.", 40, y);
    y += 30;
    pdf.text(`Total learners: ${englishData.total}`, 40, y);

    pdf.save(fileName || 'all-summaries.pdf');
}; 