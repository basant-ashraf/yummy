$(document).ready(function () {

    $('#loadingScreen .spin1').fadeOut(1000, function () {
        $('#loadingScreen').fadeOut(1000, function () {
            $('body').css('overflow', 'auto');
        })
    })

    async function getMeals(mealName = '') {
        showLoad()
        let mealsAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        let response = await mealsAPI.json();
        let meals = await response.meals;
        displayMeals(meals);
    }
    getMeals();

    function displayMeals(meals) {
        $(document).ready(function () {
            hideLoad();
        })

        let elements = '';
        for (let i = 0; i < meals.length; i++) {
            elements += `
            <div class="col-lg-3 col-md-6 px-3 my-3">
                <div class="meal position-relative box-img" element-id='${meals[i].idMeal}'>
                    <img src="${meals[i].strMealThumb}" alt="" class="w-100 rounded-1">
                    <div class="layer position-absolute d-flex align-items-center rounded-1">
                        <h3 class="fs-2">${meals[i].strMeal}</h3>
                    
                    </div>
                </div>
            </div>
            `;
        }
        if (document.querySelector('#meals .container').classList.contains('w-50')) {
            document.querySelector('#meals .container').classList.replace('w-50', 'w-75');
        }
        $('#rowMeals').html(elements);
        mealDetails();
    }

    function mealDetails() {
        $('.meal').click(function () {
            showLoad();
            getMealDetails($(this).attr('element-id'));
        })
    }

    function showLoad() {
        $('#loadingScreen2').css('display', 'flex');
        $('#loadingScreen2 .spin2').css('display', 'block');
    }
    function hideLoad() {
        $(document).ready(function () {
            $('#loadingScreen2 .spin2').fadeOut(500, function () {
                $('#loadingScreen2').fadeOut(500);
            });
        })
    }


    async function getMealDetails(elementId) {
        let detailsAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${elementId}`);
        let response = await detailsAPI.json();
        let details = await response.meals;
        displayDetails(details[0]);
    }

    function displayDetails(details) {
        hideLoad();
        let content = `
            <div class="col-md-4 px-3">
            <div class="pic">
                <img src="${details.strMealThumb}" alt="" class="w-100 d-block">
                <p id="mealName" class="text-white text-center fs-1">${details.strMeal}</p>
            </div>
        </div>
        <div class="col-md-8 text-white px-3">
            <div class="info">
                <div class="instructions">
                    <h2>Instructions</h2>
                    <p>${details.strInstructions}</p>
                    <p>
                        <span class="fw-bolder" id="area">Area:</span>
                        <span>${details.strArea}</span>
                    </p>
                    <p>
                        <span class="fw-bolder" id="category">Category:</span>
                        <span>${details.strCategory}</span>
                    </p>
                </div>
                <div class="recipe">
                    <h3>Recipes:</h3>
                    <ul class="list-unstyled d-flex flex-wrap" id="rec">
                        
                    </ul>
                </div>
                <div class="tags">
                    <h3>Tags:</h3>
                    <div class="type my-4" >
                        <ul class="list-unstyled d-flex" id="type">
                            
                        </ul>
                    </div>
                    <a href="${details.strSource}" target="_blank" class="btn btn-success source me-2">Source</a>
                    <a href="${details.strYoutube}" target="_blank" class="btn btn-danger youtube">YouTube</a>
                </div>
            </div>
        </div>
            `;

        let allIngredients = [details.strIngredient1, details.strIngredient2, details.strIngredient3, details.strIngredient4, details.strIngredient5, details.strIngredient6, details.strIngredient7, details.strIngredient8, details.strIngredient9, details.strIngredient10, details.strIngredient11, details.strIngredient12, details.strIngredient13, details.strIngredient14, details.strIngredient15, details.strIngredient16, details.strIngredient17, details.strIngredient18, details.strIngredient19, details.strIngredient20];
        let ing = allIngredients.filter(x => x.length > 0);
        let allMeasures = [details.strMeasure1, details.strMeasure2, details.strMeasure3, details.strMeasure4, details.strMeasure5, details.strMeasure6, details.strMeasure7, details.strMeasure8, details.strMeasure9, details.strMeasure10, details.strMeasure11, details.strMeasure12, details.strMeasure13, details.strMeasure14, details.strMeasure15, details.strMeasure16, details.strMeasure17, details.strMeasure18, details.strMeasure19, details.strMeasure20];
        // let mes = allMeasures.filter(m => m.length > 0);
        let rec = '';
        for (let i = 0; i < ing.length; i++) {
            rec += `
            <li class="mx-1 my-3 p-1 rounded-1">${allMeasures[i]} ${ing[i]} </li>
            `;
        }

        if (document.querySelector('#meals .container').classList.contains('w-50')) {
            document.querySelector('#meals .container').classList.replace('w-50', 'w-75');
        }
        $('#rowMeals').html(content);
        $('#rec').html(rec);
        if (details.strTags != null) {
            let types = details.strTags.split(',');
            let x = '';
            for (let i = 0; i < types.length; i++) {
                x += `
                <li class="rounded-1 mx-1 my-3 p-1 text-black" id="mealCategory">${types[i]}</li>
            `;
            }
            $('#type').html(x);
        }
        $('html,body').animate({ scrollTop: '0' }, 200);
    }

    let moveWidth = $('aside .move').outerWidth();
    $('aside').css('left', -moveWidth);

    $('#toggle').click(function () {
        let closeIcon = `<i class="fa-solid fa-xmark text-black fs-4"></i>`;
        if ($('aside').css('left') == '0px') {
            closeNav();
        }
        else {
            $('aside .fixed .toggle').html(closeIcon);
            $('aside').animate({ left: `0` }, 500, function () {
                $('aside .li1').animate({ paddingTop: '25px', opacity: '1' }, 300, function () {
                    $('aside .li2').animate({ paddingTop: '25px', opacity: '1' }, 250, function () {
                        $('aside .li3').animate({ paddingTop: '25px', opacity: '1' }, 200, function () {
                            $('aside .li4').animate({ paddingTop: '25px', opacity: '1' }, 150, function () {
                                $('aside .li5').animate({ paddingTop: '25px', opacity: '1' }, 300);
                            });
                        });
                    });
                });
            });
        }
    });

    function closeNav() {
        let menuIcon = `<i class="fa-solid fa-bars text-black fs-4">`;
        $('aside .fixed .toggle').html(menuIcon);
        $('aside li').animate({ paddingTop: '50px', opacity: '0' }, 300, function () {
            $('aside').animate({ left: `-${moveWidth}` }, 400);
        });
    }

    $('aside .nav li').click(closeNav);


    $('#searchNav').click(function () {
        let search = `
        <div class="col-md-6 mt-4 pe-3">
            <div class="search-input">
                <input type="text" class="form-control rounded-0" placeholder="Search By Name..." id="searchByName" name="searchName">
            </div>
        </div>
        <div class="col-md-6 mt-4 ps-3">
            <div class="search-input">
                <input type="text" class="form-control rounded-0" placeholder="Search By First Letter..." id="searchByLetter" name="searchLetter" maxlength="1">
            </div>
        </div>
        `;
        $('#searchInputs').html(search);
        $('#rowMeals').html('');

        $('#searchByName').on('input', function () {
            getMeals($(this).val());
            // mealDetails();
        });
        $('#searchByLetter').on('input', function () {
            getMealsLetter($(this).val());
        });
    });

    $('aside .nav li').not($('#searchNav')).click(function () {
        $('#searchInputs').html('');
    })

    async function getMealsLetter(letter) {
        if (letter) {
            showLoad();
            let letterApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
            let response = await letterApi.json();
            let mealsLetter = await response.meals;
            if (mealsLetter) {
                displayMeals(mealsLetter);
            }
        }
    }

    async function getArea() {
        hideLoad();
        let areaApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let response = await areaApi.json();
        let area = await response.meals.splice(0, 20);
        displayAreas(area);
    }

    function displayAreas(area) {
        let areas = '';
        for (let i = 0; i < area.length; i++) {
            areas += `
            <div class="col-lg-3 col-md-6 px-3 my-3 rounded-1 shadow">
            <div class="area text-center rounded-1 shadow p-1" areaAttr="${area[i].strArea}">
                <div class="icon text-center" >
                    <i class="fa-solid fa-city fa-3x"></i>
                </div>
                <h3 class="text-white">${area[i].strArea}</h3>
            </div>
        </div>
            `;
        }
        if (document.querySelector('#meals .container').classList.contains('w-50')) {
            document.querySelector('#meals .container').classList.replace('w-50', 'w-75');
        }
        $('#rowMeals').html(areas);

        $('.area').click(function () {
            $('#loadingScreen2').css('display', 'flex');
            $('#loadingScreen2 .spin2').css('display', 'block');
            filterByArea($(this).attr('areaAttr'));
        })
    }

    $('#areaNav').click(function () {
        $('#loadingScreen2').css('display', 'flex');
        $('#loadingScreen2 .spin2').css('display', 'block');
        getArea();
    });

    async function filterByArea(area) {
        let areaMealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        let response = await areaMealApi.json();
        let final = await response.meals;
        if (final.length > 20) {
            displayMeals(final.splice(0, 20));
        } else {
            displayMeals(final);
        }
    }

    async function getIngredientAPI() {
        let ingApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let response = await ingApi.json();
        let allIng = await response.meals;
        let ing = await allIng.splice(0, 20);
        displayIng(ing);
    }
    function displayIng(ing) {
        hideLoad();
        let x = '';
        for (let i = 0; i < ing.length; i++) {
            x += `
            <div class="col-lg-3 col-md-6 px-3 my-3 text-white text-center rounded-1 shadow">
            <div class="ing rounded-1 shadow p-1" ingredient="${ing[i].strIngredient}">
                <div class="icon">
                    <i class="fa-solid fa-bowl-food fa-3x"></i>
                </div>
                <h3 class="fs-2">${ing[i].strIngredient}</h3>
                <p>${ing[i].strDescription.split(' ').splice(0, 20).join(' ')}</p>
            </div>
        </div>
            `;
        }
        if (document.querySelector('#meals .container').classList.contains('w-50')) {
            document.querySelector('#meals .container').classList.replace('w-50', 'w-75');
        }
        $('#rowMeals').html(x);
        $('.ing').click(function () {
            showLoad();
            filterByIngredient($(this).attr('ingredient'));
        })
    }

    $('#ingredientsNav').click(function () {
        showLoad();
        getIngredientAPI();
    })


    async function filterByIngredient(mainIng) {
        let ingMealsApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIng}`);
        let response = await ingMealsApi.json();
        let meals = await response.meals;
        displayMeals(meals);
    }


    async function getCategoriesAPI() {
        let catAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let response = await catAPI.json();
        let cat = await response.categories;
        displayCategories(cat)
    }
    $('#categoriesNav').click(function () {
        showLoad();
        getCategoriesAPI();
    })
    function displayCategories(cat) {
        hideLoad();
        let category = '';
        for (let i = 0; i < cat.length; i++) {
            category += `
                <div class="col-lg-3 col-md-6 px-3 my-3 rounded-1 shadow">
                    <div class="cat box-img position-relative" category="${cat[i].strCategory}">
                        <img src="${cat[i].strCategoryThumb}" alt="" class="w-100 rounded-1" >
                        <div class="layer position-absolute text-center pt-2 rounded-1">
                            <h3 class="fs-2">${cat[i].strCategory}</h3>
                            <p>${cat[i].strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        if (document.querySelector('#meals .container').classList.contains('w-50')) {
            document.querySelector('#meals .container').classList.replace('w-50', 'w-75');
        }
        $('#rowMeals').html(category);

        $('.cat').click(function () {
            showLoad();
            filterByCategory($(this).attr('category'));
        })
    }

    async function filterByCategory(cat) {
        let filterAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        let response = await filterAPI.json();
        let final = response.meals;
        if (final.length > 20) {
            displayMeals(final.splice(0, 20));
        } else {
            displayMeals(final);
        }
    }
    // /////////////////////////////////////////////////
    function displayContact() {
        hideLoad();
        let contact = `
            <h2 class="text-white text-center pb-5">Contact Us...</h2>
            <div class="col-md-6">
                <div class="item mb-3">
                    <input type="text" name="name" id="nameInput" placeholder="Enter Your Name" class="form-control rounded-0">
                    <div class="alert" id="nameAlert">
                        Special Characters and Numbers not allowed
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-3">
                    <input type="text" name="email" id="emailInput" placeholder="Enter Your Email" class="form-control rounded-0">
                    <div class="alert" id="emailAlert">
                        Enter valid email. *Ex: xxx@yyy.zzz
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-3">
                    <input type="text" name="phone" id="phoneInput" placeholder="Enter Phone" class="form-control rounded-0">
                    <div class="alert" id="phoneAlert">
                        Enter valid Phone Number
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-3">
                    <input type="text" name="age" id="ageInput" placeholder="Enter Your Age" class="form-control rounded-0">
                    <div class="alert" id="ageAlert">
                        Enter valid Age
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-3">
                    <input type="password" name="password" id="passwordInput" placeholder="Enter Password" class="form-control rounded-0">
                    <div class="alert" id="passwordAlert">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item mb-3">
                    <input type="password" name="repassword" id="repasswordInput" placeholder="Renter Password" class="form-control rounded-0">
                    <div class="alert" id="repasswordAlert">
                        Enter valid Repassword
                    </div>
                </div>
            </div>
            <button class="btn btn-outline-danger mx-auto" id="submitBtn" disabled>Submit</button>
            `;

        // if(nameInputValidation()==true && emailInputValidation()==true && phoneInputValidation()==true && ageInputValidation()==true && passwordInputValidation()==true && repasswordInputValidation() ==true){
        //     $('#submitBtn').removeAttr('disabled');
        // }
        $('#rowMeals').html(contact);
        if (document.querySelector('#meals .container').classList.contains('w-75')) {
            document.querySelector('#meals .container').classList.replace('w-75', 'w-50');
        }

        $('#nameInput').on('input', function () {
            nameCheck();
            btnCheck();
        });

        $('#emailInput').on('input', function () {
            emailCheck();
            btnCheck();
        });

        $('#phoneInput').on('input', function () {
            phoneCheck();
            btnCheck();
        });

        $('#ageInput').on('input', function () {
            ageCheck();
            btnCheck();
        });

        $('#passwordInput').on('input', function () {
            passwordCheck();
            btnCheck();
        });

        $('#repasswordInput').on('input', function () {
            repasswordCheck();
            btnCheck();
        })
    }

    $('#contactNav').click(function () {
        showLoad();
        displayContact();
    });

    function btnCheck(){
        if (nameInputValidation() == true && emailInputValidation() == true && phoneInputValidation() == true && ageInputValidation() == true && passwordInputValidation() == true && repasswordInputValidation() == true) {
            $('#submitBtn').removeAttr('disabled');
        }else{
            $('#submitBtn').attr('disabled','disabled');
        }
    }
    
    function nameInputValidation() {
        return /^[a-zA-Z]+$/.test($('#nameInput').val());
    }

    function nameCheck() {
        if (nameInputValidation() != true) {
            $('#nameAlert').css('display', 'block');
            $('#nameInput').addClass('is-invalid');
        } else {
            $('#nameAlert').css('display', 'none');
            $('#nameInput').removeClass('is-invalid');
            $('#nameInput').addClass('is-valid');
        }
    }

    function emailInputValidation() {
        return /^.+@(gmail|yahoo)\.[a-z]{3,8}$/.test($('#emailInput').val());
    }
    function emailCheck() {
        if (emailInputValidation() != true) {
            $('#emailAlert').css('display', 'block');
            $('#emailInput').addClass('is-invalid');
        } else {
            $('#emailAlert').css('display', 'none');
            $('#emailInput').removeClass('is-invalid');
            $('#emailInput').addClass('is-valid');
        }
    }

    function phoneInputValidation() {
        return /^(\+2)?01[0125][0-9]{8}$/.test($('#phoneInput').val());
    }
    function phoneCheck() {
        if (phoneInputValidation() != true) {
            $('#phoneAlert').css('display', 'block');
            $('#phoneInput').addClass('is-invalid');
        } else {
            $('#phoneAlert').css('display', 'none');
            $('#phoneInput').removeClass('is-invalid');
            $('#phoneInput').addClass('is-valid');
        }
    }


    function ageInputValidation() {
        return /^[1-9][0-9]$|^100$/.test($('#ageInput').val());
    }
    function ageCheck() {
        if (ageInputValidation() != true) {
            $('#ageAlert').css('display', 'block');
            $('#ageInput').addClass('is-invalid');
        } else {
            $('#ageAlert').css('display', 'none');
            $('#ageInput').removeClass('is-invalid');
            $('#ageInput').addClass('is-valid');
        }
    }


    function passwordInputValidation() {
        return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test($('#passwordInput').val());
    }

    function passwordCheck() {
        if (passwordInputValidation() != true) {
            $('#passwordAlert').css('display', 'block');
            $('#passwordInput').addClass('is-invalid');
        } else {
            $('#passwordAlert').css('display', 'none');
            $('#passwordInput').removeClass('is-invalid');
            $('#passwordInput').addClass('is-valid');
        }
        repasswordCheck();
    }

    function repasswordInputValidation() {
        if ($('#passwordInput').val() != null) {
            if ($('#passwordInput').val() == $('#repasswordInput').val()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function repasswordCheck() {
        if (repasswordInputValidation() != true) {
            $('#repasswordAlert').css('display', 'block');
            $('#repasswordInput').addClass('is-invalid');
        } else {
            $('#repasswordAlert').css('display', 'none');
            $('#repasswordInput').removeClass('is-invalid');
            $('#repasswordInput').addClass('is-valid');
        }
    }
}); 
