import React from 'react';
import { jsPDF } from 'jspdf';
import { useRef } from 'react';
import { confirmPasswordReset } from 'firebase/auth';

const ExportPDFButton = ({ dataToExport }) => {
  var selectedExport = useRef([]);


  const checkboxList = () =>{
    let tempArray = [];
    document.querySelectorAll('[type="checkbox"]').forEach((e) =>{
        if(e.checked){
            tempArray.push(e.parentElement.id);
            selectedExport.current = tempArray;
            console.log(selectedExport.current);
        }
    })
}

  const handleExportPDF = () => {
    // checkboxList();
    let tempArray = [];
    document.querySelectorAll('[type="checkbox"]').forEach((e) =>{
        if(e.checked){
            tempArray.push(e.parentElement.id);
            selectedExport.current = tempArray;
            console.log(selectedExport.current);
        }
    })
    if(tempArray.length>0){     
        const doc = new jsPDF();
            let yPos = 10;
            const newElement = document.createElement('div');
            newElement.style.width="595px"
            newElement.style.display="flex"
            newElement.style.flexDirection="column"
            newElement.style.fontSize = '8px !important';
            

            console.log(tempArray)
            tempArray.forEach((e) => {
                const elementCopy = document.getElementById(e).cloneNode(true)
                elementCopy.style.width=`100%`
                elementCopy.style.backgroundColor="#eeeeee"
                elementCopy.style.marginBottom='10px'
                elementCopy.style.padding='10px'
                elementCopy.style.borderRadius='15px'
                // elementCopy.style.padding=`1em`
                newElement.append(elementCopy);
                newElement.appendChild(document.createElement('br'));
                console.log(newElement)
            })
            newElement.querySelectorAll('input').forEach((e) => {
                e.remove();
            })
            newElement.querySelectorAll('button').forEach((e) => {
                e.remove();
            })

            console.log(newElement)
            doc.setFontSize(2)
            doc.html(newElement, {
                callback: function (doc) {
                  doc.save('exported-plan.pdf');
                },
                x: 10,
                y: 10,
                html2canvas: { scale: 0.2 }
             });
    } else{
        window.alert("Please select at least 1 plan to export!");
    }



    // doc.save('exported-plan.pdf');
  };

  return (
    <button onClick={handleExportPDF}>
      Export as PDF
    </button>
  );
};

export default ExportPDFButton;
