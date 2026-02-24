let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';


// COUNT
let total = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");


// GET ALL-CARDS, FILTERED CARDS AND MAIN SECTION
const allCardSection = document.getElementById("all-cards");

const mainContainer = document.querySelector('main');

const filterSection = document.getElementById('filtered-section');

// GET JOBCOUNT. right side er job count
const jobCount = document.getElementById("jobCount");


// filter buttons. For toggling
const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");
// console.log(allFilterBtn, interviewFilterBtn, rejectedFilterBtn)


// length -> cards count in all-cards, interview List, & rejected List
function calculateCount() {
    total.innerText = allCardSection.children.length;

    interviewCount.innerText = interviewList.length;

    rejectedCount.innerText = rejectedList.length;

    rightSideJobCount();
}

calculateCount();


// Toggle style and what will be shown in the filter section > 3 ta button er moddhe
function toggleStyle(id) {
    allFilterBtn.classList.remove("bg-sky-500", "text-white");
    interviewFilterBtn.classList.remove("bg-sky-500", "text-white");
    rejectedFilterBtn.classList.remove("bg-sky-500", "text-white");

    allFilterBtn.classList.add("bg-white", "text-[#64748B]");
    interviewFilterBtn.classList.add("bg-white", "text-[#64748B]");
    rejectedFilterBtn.classList.add("bg-white", "text-[#64748B]");

    const selected = document.getElementById(id);
    currentStatus = id;
    // console.log(selected);

    selected.classList.remove("bg-white", "text-[#64748B]");
    selected.classList.add("bg-sky-500", "text-white");




    // jodi interview click hoy
    // all hide hobe, filter unhide hobe aar interview render hobe
    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }
    // jodi All click hoy
    // all unhide hobe, filter hide hobe aar basic html tai show hobe.
    else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    // jodi rejected click hoy
    // all hide hobe, filter unhide hobe aar rejected render hobe
    else if (id == 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }


    // currentStatus function e dhuklo. condition meet koriyene specific innerText show korbe
    rightSideJobCount();
}


mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview-btn')) {
        // button er parent er parent div
        const parentNode = event.target.parentNode.parentNode;

        // parent er parent theke card er shob info nilam
        const companyName = parentNode.querySelector('.company-name').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const notes = parentNode.querySelector('.notes').innerText;

        // status directly button er tai set hoilo
        parentNode.querySelector('.status').innerText = "INTERVIEW";

        // console.log(companyName, position, location, type, salary, status, notes);

        // necessary info di object banailam
        const cardInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status: 'INTERVIEW',
            notes
        };
        // console.log(cardInfo);

        // interview list e shob item check korbe. konou item er company nam object er company name er shoman naki
        const checkExists = interviewList.find(item => item.companyName == cardInfo.companyName);


        // push korbe shoman na hoile
        if (!checkExists) {
            interviewList.push(cardInfo);
        }

        // jei item er interview te push hoilo. sheita rejectlist e thakle, direct filter out koriyene baki gula rejectedList e assign korbe
        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);

        // ei kaj korar time e rejected toggle e thakle on spot re-render hoi jabe rejected filter section.
        if (currentStatus == "rejected-filter-btn") {
            renderRejected();
        }

        calculateCount();

    }
    else if (event.target.classList.contains('rejected-btn')) {
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company-name').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const notes = parentNode.querySelector('.notes').innerText;

        parentNode.querySelector('.status').innerText = "REJECTED";

        // console.log(companyName, position, location, type, salary, status, notes);

        const cardInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status: 'REJECTED',
            notes
        };
        // console.log(cardInfo);

        const checkExists = rejectedList.find(item => item.companyName == cardInfo.companyName);


        if (!checkExists) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);

        if (currentStatus == "interview-filter-btn") {
            renderInterview();
        }

        calculateCount();
    }

    // else if (event.target.classList.contains('btn-delete')){
    else if (event.target.closest('.btn-delete')) {
        // const parentNode = event.target.parentNode.parentNode;
        const parentNode = event.target.closest('.card');
        const companyName = parentNode.querySelector('.company-name').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const notes = parentNode.querySelector('.notes').innerText;

        parentNode.querySelector('.status').innerText = "NOT APPLIED";

        // console.log(companyName, position, location, type, salary, status, notes);

        const cardInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status: 'NOT APPLIED',
            notes
        };
        // console.log(cardInfo);

        // interview or rejected list e thakle filter out kore baki gula thaklo
        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);

        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);

        // filter section theke card ta remove hoilo
        parentNode.remove();

        // jei filter section e thakbe sheita re render korlo
        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        }
        else if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }


        calculateCount();
    }
})


// Interview Render
function renderInterview() {
    filterSection.innerHTML = '';

    // jodi list khali thake > length 0. taile filter section e no job thakbe
    if (interviewList.length === 0) {
        filterSection.innerHTML = `
        <div class="border border-gray-200 rounded-lg px-10 py-15 space-y-5 flex flex-col justify-center items-center">
            <img src="assets/blank_page.png" alt="">
            <div class="text-center">
                <h1 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h1>
            <p class="text-[#64748B]">Check back soon for new job opportunities</p>
            </div>
        </div>
    `;
    }

    // jodi khali na thake, taile list theke ekta ekta card dhorbe. notun card banai sheitare filter section e append korbe
    for (let interview of interviewList) {
        // console.log(interview);
        let div = document.createElement('div');

        div.className = 'card flex justify-between border border-gray-200 rounded-lg p-5';

        div.innerHTML = `
            <!-- main part 1 -->
                <div id="" class="space-y-5">
                    <!-- part 1 -->
                    <div id="" class="">
                        <h3 class="company-name text-lg font-semibold text-[#002C5C] mb-2">${interview.companyName}</h3>
                        <p class="position text-[#64748B]">${interview.position}</p>
                    </div>

                    <!-- part 2 -->
                    <div id="" class="text-sm text-[#64748B]">
                        <p class="info"><span class="location">${interview.location}</span> &bull; <span class="type">${interview.type}</span> &bull; <span class="salary">${interview.salary}</span></p>
                    </div>

                    <!-- part 3 -->
                    <div id="" class="">
                        <p class="status text-sm text-[#002C5C] font-medium bg-[#EEF4FF] px-3 py-2 max-w-max rounded-md mb-2">${interview.status}</p>
                        <p class="notes text-sm text-[#323B49]">${interview.notes}</p>
                    </div>

                    <!-- part 4 - buttons -->
                    <div id="" class="flex gap-3">
                        <button class="interview-btn text-[#10B981] font-semibold text-sm border border-[#10B981] rounded-md px-3 py-2">INTERVIEW</button>
                        <button class="rejected-btn text-[#EF4444] font-semibold text-sm border border-[#EF4444] rounded-md px-3 py-2">
                            REJECTED
                        </button>
                    </div>
                </div>

                <!-- main part 2 -->
                <div id="" class="">
                    <button class="btn-delete flex justify-center items-center w-10 h-10 rounded-full border border-gray-200 active:border-red-600">
                        <i class="fa-regular fa-trash-can" style="color: #64748b;"></i>
                    </button>
                </div>
        `;

        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.innerHTML = '';

    if (rejectedList.length === 0) {
        filterSection.innerHTML = `
        <div class="border border-gray-200 rounded-lg px-10 py-15 space-y-5 flex flex-col justify-center items-center">
            <img src="assets/blank_page.png" alt="">
            <div class="text-center">
                <h1 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h1>
            <p class="text-[#64748B]">Check back soon for new job opportunities</p>
            </div>
        </div>
    `
    }

    for (let rejected of rejectedList) {
        // console.log(interview);
        let div = document.createElement('div');

        div.className = 'card flex justify-between border border-gray-200 rounded-lg p-5';

        div.innerHTML = `
            <!-- main part 1 -->
                <div id="" class="space-y-5">
                    <!-- part 1 -->
                    <div id="" class="">
                        <h3 class="company-name text-lg font-semibold text-[#002C5C] mb-2">${rejected.companyName}</h3>
                        <p class="position text-[#64748B]">${rejected.position}</p>
                    </div>

                    <!-- part 2 -->
                    <div id="" class="text-sm text-[#64748B]">
                        <p class="info"><span class="location">${rejected.location}</span> &bull; <span class="type">${rejected.type}</span> &bull; <span class="salary">${rejected.salary}</span></p>
                    </div>

                    <!-- part 3 -->
                    <div id="" class="">
                        <p class="status text-sm text-[#002C5C] font-medium bg-[#EEF4FF] px-3 py-2 max-w-max rounded-md mb-2">${rejected.status}</p>
                        <p class="notes text-sm text-[#323B49]">${rejected.notes}</p>
                    </div>

                    <!-- part 4 - buttons -->
                    <div id="" class="flex gap-3">
                        <button class="interview-btn text-[#10B981] font-semibold text-sm border border-[#10B981] rounded-md px-3 py-2">INTERVIEW</button>
                        <button class="rejected-btn text-[#EF4444] font-semibold text-sm border border-[#EF4444] rounded-md px-3 py-2">
                            REJECTED
                        </button>
                    </div>
                </div>

                <!-- main part 2 -->
                <div id="" class="">
                    <button class="btn-delete flex justify-center items-center w-10 h-10 rounded-full border border-gray-200 active:border-red-600">
                        <i class="fa-regular fa-trash-can" style="color: #64748b;"></i>
                    </button>
                </div>
        `;

        filterSection.appendChild(div);
    }
}


// dan side er count er innerText. total e all card er length gelo, baki 2 ta list er length theke nibo. then {count of total job} format hobe.
function rightSideJobCount() {
    const totalJobs = allCardSection.children.length;

    if (currentStatus == "all-filter-btn") {
        jobCount.innerText = `${totalJobs} jobs`;
    }
    else if (currentStatus == "interview-filter-btn") {
        jobCount.innerText = `${interviewList.length} of ${totalJobs} jobs`;
    }
    else if (currentStatus == "rejected-filter-btn") {
        jobCount.innerText = `${rejectedList.length} of ${totalJobs} jobs`;
    }
}