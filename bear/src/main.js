const fileInput = document.querySelector(".file");

alert("test");

const beforeTable = document.createElement("table");
beforeTable.border = 1;
beforeTable.cellSpacing = 0;
beforeTable.style.marginTop = "20px";
beforeTable.style.display = "none";
beforeTable.classList.add("before-table");

const afterTable = document.createElement("table");
afterTable.border = 1;
afterTable.cellSpacing = 0;
afterTable.style.marginTop = "20px";

const checkbox = document.querySelector(".checkbox");
const exportResultTableBtn = document.querySelector(".export");

function renderTable(xlsxReader) {
  xlsxReader.Strings.forEach((el) => {
    if (el.t !== "Link" && el.t !== "") {
      const beforeTr = document.createElement("tr");
      const beforeTd = document.createElement("td");
      beforeTd.textContent = el.t;
      beforeTr.appendChild(beforeTd);
      beforeTable.appendChild(beforeTr);

      const splitedStr = el.t.split(" ");
      const ru = [];
      const en = [];
      splitedStr.forEach((word) => {
        if (/[A-z]/.test(word) || (en.length > 0 && /\d/.test(word))) {
          en.push(word);
        } else {
          ru.push(word);
        }
      });
      const ruPhrase = ru.join(" ");
      const enPhrase = en.join(" ");
      const tr = document.createElement("tr");
      const ruTd = document.createElement("td");
      const enTd = document.createElement("td");
      ruTd.textContent = ruPhrase;
      enTd.textContent = enPhrase;
      tr.appendChild(ruTd);
      tr.appendChild(enTd);
      afterTable.appendChild(tr);
    }
  });

  document.body.appendChild(beforeTable);
  document.body.appendChild(afterTable);
  exportResultTableBtn.style.display = "block";
}

fileInput.addEventListener("change", (e) => {
  const allTables = document.querySelectorAll("table");
  allTables.forEach((table) => table.remove());

  const files = e.target.files;
  if (files[0]) {
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = e.target.result;
      const xlsxReaderResult = XLSX.read(data, { type: "binary" });
      renderTable(xlsxReaderResult);
    };

    fileReader.readAsBinaryString(file);
  }
});

checkbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    beforeTable.style.display = "table";
  } else {
    beforeTable.style.display = "none";
  }
});

exportResultTableBtn.addEventListener("click", () => {
  var wb = XLSX.utils.table_to_book(afterTable, { sheet: "export" });
  XLSX.writeFile(wb, "export.xlsx");
});
