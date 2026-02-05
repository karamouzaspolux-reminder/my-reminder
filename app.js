// My-Reminder app.js (εκπαιδευτική έκδοση με εκτενή σχόλια & VBA αντιστοιχίες)

// ================= PIN CONSTANT =================
const CORRECT_PIN = "05031927";
// Σταθερά PIN
// VBA: Const CORRECT_PIN = "05031927"


// ================= PIN CHECK =================
function checkPin() {
  const input = document.getElementById("pinInput").value;
  // Διαβάζει τιμή από input
  // VBA: input = Me.txtPIN.Value

  if (input === CORRECT_PIN) {
    document.getElementById("login").style.display = "none";
    // Απόκρυψη login panel
    // VBA: Me.pnlLogin.Visible = False

    document.getElementById("app").style.display = "block";
    // Εμφάνιση κύριας εφαρμογής
    // VBA: Me.pnlApp.Visible = True

    loadNotes();
    // Refresh δεδομένων
    // VBA: Me.Requery
  } else {
    alert("Λάθος PIN");
    // VBA: MsgBox "Λάθος PIN"
  }
}


// ================= ADD NOTE =================
function addNote() {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();
  // VBA: text = Trim(Me.txtNote.Value)

  if (text === "") return;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  // Ανάκτηση δεδομένων
  // VBA: Set notes = GetFromStorage("notes")

  notes.push(text);
  // Προσθήκη εγγραφής
  // VBA: notes.Add text

  localStorage.setItem("notes", JSON.stringify(notes));
  // Αποθήκευση

  input.value = "";
  renderNotes();
}


// ================= LOAD NOTES =================
function loadNotes() {
  renderNotes();
}


// ================= RENDER NOTES =================
function renderNotes() {
  const list = document.getElementById("notesList");
  list.innerHTML = "";
  // Καθαρίζει λίστα (refresh)
  // VBA: lstNotes.RowSource = ""

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note, index) => {
    // Loop εγγραφών
    // VBA: For i = 1 To notes.Count

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = note;

    span.ondblclick = () => editNote(index);
    // Διπλό κλικ = επεξεργασία

    // --- Buttons ---
    const upBtn = document.createElement("button");
    upBtn.textContent = "▲";
    upBtn.onclick = () => moveNoteUp(index);

    const downBtn = document.createElement("button");
    downBtn.textContent = "▼";
    downBtn.onclick = () => moveNoteDown(index);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editNote(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.onclick = () => removeNote(index);

    // Σύνθεση γραμμής
    li.appendChild(span);
    li.appendChild(upBtn);
    li.appendChild(downBtn);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
    // VBA: lstNotes.AddItem
  });
}


// ================= REMOVE NOTE =================
function removeNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.splice(index, 1);
  // Διαγραφή εγγραφής
  // VBA: notes.Remove index

  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}


// ================= EDIT NOTE =================
function editNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  let newText = prompt(
    "Τροποποίηση υπενθύμισης:",
    notes[index]
  );
  // VBA: InputBox

  if (newText === null) return;

  newText = newText.trim();
  if (newText === "") return;

  notes[index] = newText;

  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}


// ================= MOVE NOTE UP =================
function moveNoteUp(index) {
  if (index === 0) return;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  [notes[index - 1], notes[index]] =
    [notes[index], notes[index - 1]];
  // Swap εγγραφών

  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}


// ================= MOVE NOTE DOWN =================
function moveNoteDown(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (index === notes.length - 1) return;

  [notes[index + 1], notes[index]] =
    [notes[index], notes[index + 1]];

  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}
