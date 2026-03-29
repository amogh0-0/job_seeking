const jobs=[
{id:1,title:"Senior Frontend Engineer",company:"Company 1",salary:155000,type:"Remote"},
{id:2,title:"Product Designer",company:"Company 2",salary:130000,type:"Remote"},
{id:3,title:"Backend Engineer (Go)",company:"Company 3",salary:175000,type:"On-site"},
{id:4,title:"Data Scientist",company:"Company 4",salary:145000,type:"On-site"},
{id:5,title:"DevOps Engineer",company:"Company 5",salary:138000,type:"Remote"},
{id:6,title:"iOS Engineer",company:"Company 6",salary:128000,type:"On-site"},
{id:7,title:"ML Engineer",company:"Company 7",salary:190000,type:"Remote"},
{id:8,title:"UX Researcher",company:"Company 8",salary:118000,type:"Remote"},
{id:9,title:"Full Stack Developer",company:"Company 9",salary:142000,type:"Remote"},
{id:10,title:"Engineering Manager",company:"Company 10",salary:168000,type:"On-site"},
{id:11,title:"Security Engineer",company:"Company 11",salary:152000,type:"Remote"},
{id:12,title:"Brand Designer",company:"Company 12",salary:112000,type:"On-site"}
];

function fmtSalary(n){
return 'Rs '+(n/1000).toFixed(0)+'k / yr';
}

function renderJobs(){

const query=document.getElementById("searchInput").value.toLowerCase();
const type=document.getElementById("typeFilter").value;
const salary=document.getElementById("salaryFilter").value;

const grid=document.getElementById("jobsGrid");

const filtered=jobs.filter(j=>{

if(query && !j.title.toLowerCase().includes(query) && !j.company.toLowerCase().includes(query))
return false;

if(type && j.type!==type)
return false;

if(salary){
const[min,max]=salary.split("-").map(Number);
if(j.salary<min || j.salary>max)
return false;
}

return true;

});

document.getElementById("resultsCount").textContent=filtered.length+" results";
document.getElementById("heroCount").textContent=filtered.length;

grid.innerHTML=filtered.map(j=>`

<div class="job-card">

<div class="card-top">

<div>
<div class="job-title">${j.title}</div>
<div class="company-name">${j.company}</div>
</div>

<span class="type-badge ${j.type==="Remote"?"remote":"onsite"}">${j.type}</span>

</div>

<div class="card-meta">
<span>💼 Full-time</span>
</div>

<div class="card-footer">

<div class="salary">${fmtSalary(j.salary)}</div>

<button class="apply-btn" onclick="openModal(${j.id})">
Apply Now
</button>

</div>

</div>

`).join("");

}

function openModal(id){

const job=jobs.find(j=>j.id===id);

document.getElementById("modalJobTitle").textContent=job.title;

document.getElementById("modalBody").innerHTML=`

<div class="form-field">
<input type="text" id="name" placeholder="Full Name">
</div>

<div class="form-field">
<input type="email" id="email" placeholder="Email">
</div>

<div class="form-field">
<textarea id="cover" rows="4" placeholder="Cover Letter"></textarea>
</div>

<div class="form-actions">
<button class="btn-cancel" onclick="closeModal()">Cancel</button>
<button class="btn-submit" onclick="submitForm()">Submit</button>
</div>

`;

document.getElementById("modalOverlay").classList.add("open");

}

function closeModal(){
document.getElementById("modalOverlay").classList.remove("open");
}

function submitForm(){

const name=document.getElementById("name").value.trim();
const email=document.getElementById("email").value.trim();
const cover=document.getElementById("cover").value.trim();

if(name==="" || email==="" || cover===""){
alert("Please fill all fields before submitting.");
return;
}

alert("Application submitted successfully!");
closeModal();

}

renderJobs();