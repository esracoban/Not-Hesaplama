
// boş bir öğrenci dizisi
let students=[]

// Öğrenci Bilgilerini localstorage'da varsa alma

let varMiLocalde=localStorage.getItem('students')

if(varMiLocalde){
    students=JSON.parse(localStorage.getItem('students'))
}else{
   students=[]
}

// document HTML dosyalarına ulaşır
// querySelector seçici işlemi

const studentForm=document.querySelector('#student-form')

// Öğrenci listesi seçme
const studentList=document.querySelector('#student-list')


// Öğrenci Ekleme butonu
const addButton=document.querySelector('.ekle')
viewStudentList()

// Öğrenci ekleme İşleme işleme
// studentForm submit edildiğinde çalışacak olan olay
studentForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    // Formdaki değerleri almak 
    const name = document.querySelector('#name').value
    const surname=document.querySelector('#surname').value
    const number=document.querySelector('#number').value
    const vize=document.querySelector('#vize').value
    const final=document.querySelector('#final').value

    const newStudent = {
        name:name,
        surname:surname,
        number:number,
        vize: Number(vize),
        final: parseInt(final)
    }

    students.push(newStudent)

    

    // Öğrenciyi locale kaydetme ve güncelleme
    saveToLocalStorage()
    viewStudentList()
    // formu temizle
    studentForm.reset()

})

// Öğrencileri Listede Görüntüleme

// viewStudentList()

function viewStudentList(){
    const emptyList = document.querySelector('.empty')
    
    if(students.length){

        if(emptyList){
            emptyList.style.display='none'
        }

        studentList.innerHTML=''
        students.forEach((oAnkiOgrenci, index) => {

            const studentCard =`
            <div class="student-item-info">
                <h3>${oAnkiOgrenci.name} ${oAnkiOgrenci.surname} - ${oAnkiOgrenci.number}</h3>
                <span>Vize: ${oAnkiOgrenci.vize} Final: ${oAnkiOgrenci.final}</span>
                <p>Ortalama: ${((oAnkiOgrenci.vize+oAnkiOgrenci.final)/2).toFixed(2)}</p>
            </div>
            <div class="student-item-process">
                <i class="fa-regular fa-pen-to-square edit-button" onclick='editStudent(${index})'></i>
                <i class="fa-solid fa-trash delete-button" onclick ="deleteStudent(${index})" ></i>
            </div>
            </div>` 
        
            const studentItem=document.createElement('div')
            studentItem.classList.add('student-item')
            studentItem.innerHTML=studentCard
             const ort = ((oAnkiOgrenci.vize + oAnkiOgrenci.final)/2).toFixed(2)
             if (ort>80){
                studentItem.style.background =' #15aefe'
             }else if(ort>60){
                studentItem.style.background ='#f47121'
             }else if(ort>45){
                studentItem.style.background =' #6303ff'
             }else{
                studentItem.style.background =' #ff0fe4'
             }

            studentList.appendChild(studentItem)

        })
    }else{
        const forEmpty = ` <p class="empty">Listenizde Öğrenci Bulunmamaktadır</p> `

        studentList.innerHTML=forEmpty
    
    }

    
}

// Öğrenci silme işlemi
function deleteStudent(gelenIndex){

// Silinecek dizi elemanının indexi (gelenIndex) öğrenci dizisinde eşit olmayanları listeledik.
const sonuc= students.filter((oAnkiDeger,index)=>index!==gelenIndex)

const silinecekOgr = students.find((oAnkiDeger,index)=>index===gelenIndex)
Toastify({
    text: `${silinecekOgr.name} listeden silindi`,    
    duration: 3000    
    }).showToast();


students=sonuc // Filtremele işlemine göre dizimi güncelleme

saveToLocalStorage()
// Öğrenci bilgilerini 

// güncellenen öğrencileri görüntüleme fonksiyonu 
viewStudentList()

}

function editStudent(gelenIndex){
    const editStudent = students.find((oAnkiOgrenci,index)=>index===gelenIndex)
    console.log(editStudent)
    document.querySelector('#name').value=editStudent.name
    document.querySelector('#surname').value=editStudent.surname
    document.querySelector('#number').value=editStudent.number
    document.querySelector('#vize').value=editStudent.vize
    document.querySelector('#final').value=editStudent.final
    
    deleteStudent(gelenIndex)

    saveToLocalStorage()
    
}


// Öğrenci bilgilerini local storage'da saklama
function saveToLocalStorage(){
    localStorage.setItem("students",JSON.stringify(students))
}