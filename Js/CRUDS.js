let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


let mood = "Create";
// create Product وأستخدمها بال updateData() الموجودة بال i متغير وهمي علشان أحط فيه قيمة ال
let tmp;

// Get Total
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
        total.style.color = "white";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "yellow";
        total.style.color = "#111";
    }
}

/////////////////////////////////////////////////////////////////////////

// Create Product
// Save Localstorage


/*
لكن localStorageهنكتب الكود هاد علشان لماأضيف بيانات منتج معين وأضيف اللي بعده كلهم هيتخزنوا بال
لو أجيت بعد هيك وعملت للصفحة إعادة تحميل وأجيت بدي أضيف منتج وأخزنه باللوكل راح يحذف البيانات
اللي تسجلت قبل ويضيف من أول وجديد فلازم اللوكل نفحصه اذا مش فاضي فجيب المصفوفة وخليها بتساوي البيانات المسجلة
localStorage
*/
let dataPro; // عرفناها بالأول
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);  // هنا هنرجع لأصلها كمصفوفة لانه تحت خليناها نص
} else {
    dataPro = [];
}

submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),   //small علشان لما أنشئ منتج يتسجل بال lowerCase حطيت انه يخليلي اياها 
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    // update + button create and update خاصة بزر ال
    if (mood === "Create") {
            // Count
        if (newPro.count > 1) {  // كتبت أكبر من واحد لانه لو كتبت واحد مش هيأثر لانه هيك هيك هيطبع واحد بدون هالواسطة فلازم أكبر من واحد
            for (let i = 0; i < newPro.count; i++) {
                // بدي أضيف البيانات بالمصفوفة وعلشان ما يحذف الاوبجكت القديم
                dataPro.push(newPro);
            }
        } else {
            // بدي أضيف البيانات بالمصفوفة وعلشان ما يحذف الاوبجكت القديم
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mood = "Create";
        submit.innerHTML = "Create";
        count.style.display = "block";
    }

    localStorage.setItem("product", JSON.stringify(dataPro));

    // Clear inputs
    clearData();
    // Read
    showData();
}

/////////////////////////////////////////////////////////////////////////

// Clear inputs
// create بعد ما أضغط على input هنا بدي أنظف ال
// submit.onclick ... إستدعائها موجود بال
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}


/////////////////////////////////////////////////////////////////////////

// Read
// تظهرلي البيانات بالجدول create بعد ما أعمل 
function showData() {
    // علشان بعد ما أعمل إنشاء منتج ترجع للون الًاصلي
    getTotal()

    let table = "";
    for (let i = 1; i < dataPro.length; i++) {
        //ضفت الزائد علشان يضيف بكل مرة صف جديد وما يحذف الصف اللي قبله
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick= "deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;

    // DeleteAll لإظهار زر
    let btnDeleteAll = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick= "deleteAll()">Delete All (${dataPro.length})</button>
        `;
    } else {
        btnDeleteAll.innerHTML = ``;
    }
}
// إستدعيتها هان 
// البيانات تفضل موجودة بالجدول reload علشان لما أعمل للصفحة.
showData()

/////////////////////////////////////////////////////////////////////////

// Delete
// إستدعيتها فوق بالجدول بزر الحذف
function deleteData(i) {
    dataPro.splice(i, 1); // 1: يعني يحذف منتج واحد
    // ضيفلي فيه المصفوفة الجديدة بعد ما حذفت العنصر هاد ولازم تحولها لنص
    localStorage.product = JSON.stringify(dataPro);
    // html علشان أحدث ال
    showData()
}

function deleteAll() {
    // هيحذف كل البيانات داخل اللوكل
    localStorage.clear();
    // Array هيحذف كل البيانات اللي داخل ال
    dataPro.splice(0);
    showData()
}

/////////////////////////////////////////////////////////////////////////

// Update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = "none";
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll ({
        top:0,
        behavior: "smooth",
    })
}

/////////////////////////////////////////////////////////////////////////

// Search
let searchMood = "title";
function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == "searchTitle") {
        searchMood = "title";
        search.placeholder = "Search By Title";
    } else {
        searchMood = "category";
        search.placeholder = "Search By Category";
    }
    // search.placeholder = "Search By "+ searchMood; سطر مختصر للجملتين اللي فوق اذا حابب تختصرهم
    search.focus();
    // خانة البحث ترجع فاضية Category علشان لما أضغط على زر البحث بالعنوان او ال
    search.value = "";
    // ترجع البيانات الأصلية Category ترجع البيانات تظهر ولما أرجع أضغط على زر ال Title علشان لما أضغط على زر البحث بال
    showData();
}

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i}) id="update">Update</button></td>
                    <td><button onclick= "deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                `;
            }
        } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i}) id="update">Update</button></td>
                    <td><button onclick= "deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}