// Direct-to-PDF export using jsPDF and jsPDF-AutoTable
// This function expects a data object with all dashboard values
window.downloadDashboardPdf = async function () {
    var doc = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    var pageWidth = doc.internal.pageSize.getWidth();
    var pageHeight = doc.internal.pageSize.getHeight();
    var dateStr = new Date().toLocaleDateString();
    var sectionIds = [
        'dashboard-content', // summary and stats
        'tally-table-section', // comprehension level tally table
        'division-bar-chart-section', // <-- ADD THIS to include the chart
        'grade-level-section', // grade level analysis
        'top-learners-section' // top performing students
    ];
    for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
            await html2canvas(section, { scale: 2, useCORS: true, backgroundColor: '#fff' }).then(function(canvas) {
                if (i > 0) doc.addPage();
                var imgData = canvas.toDataURL('image/png');
                console.log('imgData for', sectionIds[i], imgData);
                // Preview image for debugging (now hidden)
                let img = new window.Image();
                img.src = imgData;
                img.className = 'pdf-preview-thumbnail';
                img.style.maxWidth = '300px';
                img.style.border = '2px solid #4caf50';
                img.style.margin = '8px';
                img.alt = 'Preview for ' + sectionIds[i];
                document.body.appendChild(img);
                // Fit image to page, keep aspect ratio
                var imgWidth = pageWidth - 40;
                var imgHeight = canvas.height * (imgWidth / canvas.width);
                if (imgHeight > pageHeight - 60) {
                    imgHeight = pageHeight - 60;
                    imgWidth = canvas.width * (imgHeight / canvas.height);
                }
                var x = (pageWidth - imgWidth) / 2;
                var y = 30;
                try {
                    doc.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
                } catch (e) {
                    console.error('addImage error for section:', sectionIds[i], e);
                    doc.setFontSize(16);
                    doc.setTextColor('#dc3545');
                    doc.text('Error rendering section: ' + sectionIds[i], 40, 60);
                }
            });
        } else {
            if (i > 0) doc.addPage();
            doc.setFontSize(16);
            doc.setTextColor('#dc3545');
            doc.text('Section not found: ' + sectionIds[i], 40, 60);
        }
        // Footer
        doc.setFontSize(10);
        doc.setTextColor('#888888');
        doc.text('Date generated: ' + dateStr, pageWidth / 2, pageHeight - 20, { align: 'center' });
    }
    doc.save('dashboard.pdf');
}

// Helper for percent
function percent(val, total) {
    if (!total || total === 0) return '0%';
    return ((val / total) * 100).toFixed(1) + '%';
}

var style = document.createElement('style');
style.innerHTML = '.pdf-preview-thumbnail { display: none !important; }';
document.head.appendChild(style); 