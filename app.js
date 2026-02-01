// My-Reminder app.js (εκπαιδευτική έκδοση με σχόλια & VBA αντιστοιχίες)

const CORRECT_PIN = "05031927"; 
// Σταθερά PIN (VBA: Const CORRECT_PIN = "05031927")

function checkPin() {
  const input = document.getElementById("pinInput").value;
  // Παίρνει τιμή input (VBA: input = Me.txtPIN.Value)

  if (input === CORRECT_PIN) {
    // If input = CORRECT_PIN Then

    document.getElementById("login").style.display = "none";
    // Me.pnlLogin.Visible = False

    document.getElementById("app").style.display = "block";
    // Me.pnlApp.Visible = True

    loadNotes();
    // Me.Requery
  } else {
    alert("Λάθος PIN");
    // MsgBox "Λάθος PIN"
  }
}

function addNote() {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();
  // VBA: text = Trim(Me.txtNote.Value)

  if (text === "") return;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  // VBA: Set notes = GetFromStorage("notes")

  notes.push(text);
  // notes.Add text

  localStorage.setItem("notes", JSON.stringify(notes));
  // SaveToStorage("notes", notes)

  input.value = "";
  renderNotes();
}

function loadNotes() {
  renderNotes();
}

function renderNotes() {
  const list = document.getElementById("notesList");
  list.innerHTML = "";

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note, index) => {
    // For i = 1 To notes.Count

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = note;
    span.ondblclick = () => editNote(index);

	const upBtn = document.createElement("button");
	upBtn.textContent = "▲";
	upBtn.onclick = () => moveNoteUp(index);

	const downBtn = document.createElement("button");
	downBtn.textContent = "▼";
	downBtn.onclick = () => moveNoteDown(index);

    const editBtn = document.createElement("button");
	editBtn.textContent = "✏️";
	editBtn.className = "edit-btn";
	editBtn.onclick = () => editNote(index);

	const delBtn = document.createElement("button");
	delBtn.textContent = "✖";
	delBtn.className = "remove-btn";
	delBtn.onclick = () => removeNote(index);


    li.appendChild(span);
	li.appendChild(upBtn);
	li.appendChild(downBtn);
	li.appendChild(editBtn);
	li.appendChild(delBtn);


    list.appendChild(li);
  });
}

function removeNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  // notes.Remove index+1

  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function editNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let newText = prompt("Τροποποίηση υπενθύμισης:", notes[index]);

  if (newText === null) return;       // ακύρωση
  newText = newText.trim();
  if (newText === "") return;

  notes[index] = newText;
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function moveNoteUp(index) {
  if (index === 0) return;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  [notes[index - 1], notes[index]] = [notes[index], notes[index - 1]];

  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function moveNoteDown(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  if (index === notes.length - 1) return;

  [notes[index + 1], notes[index]] = [notes[index], notes[index + 1]];

  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}
