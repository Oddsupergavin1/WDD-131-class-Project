const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  sections: [
    { 
     sectionNum: 1,
     roomNum: 'STC 353',
      enrolled: 26, 
      days: 'TTh', 
      instructor: 'Bro T'
    },
    { 
    sectionNum: 2, 
    roomNum: 'STC 347', 
    enrolled: 28, 
    days: 'TTh', 
    instructor: 'Sis A'
    }
],
enrollStudent: function (sectionNum) {
    console.log("sectionNum to enroll in:", sectionNum);
    const theSection = this.sections.find((section)=> sectionNum == section.sectionNum);
    if (theSection) {
    theSection.enrolled++
    renderSections(this.sections);
    }
},
dropStudent: function (sectionNum) {
    console.log("sectionNum to drop from:", sectionNum);
    const theSection = this.sections.find((section)=> sectionNum == section.sectionNum);
    if (theSection) {
        theSection.enrolled--;
        renderSections(this.sections);
    }
}
};

function renderCourses(course) {
    const nameEl = document.querySelector("#courseName");
    const codeEl = document.querySelector("#courseCode");
    nameEl.textContent = course.name;
    codeEl.textContent = course.code;
}

function sectionTemplate(section) {
return `   <tr>
            <td>${section.sectionNum}</td>
            <td>${section.roomNum}</td>
            <td>${section.enrolled}</td>
            <td>${section.days}</td>
            <td>${section.instructor}</td>
        </tr>`
}

function renderSections(sections) {
    const sectonsEl = document.querySelector("#sections");
    const html = sections.map(sectionTemplate)
    sectonsEl.innerHTML = html.join("");
}

renderCourses(aCourse);
renderSections(aCourse.sections);

function clickHandler(event) {
    const sectionNum = document.querySelector("#sectionNumber").value;
    if (event.target.id === "enrollStudent") {
        aCourse.enrollStudent(sectionNum);
    } 
    else { 
        aCourse.dropStudent(sectionNum); 
    }
};
    
document.querySelector("#enrollStudent").addEventListener("click", clickHandler);
document.querySelector("#dropStudent").addEventListener("click", clickHandler);