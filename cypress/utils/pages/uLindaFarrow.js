import base from "./base-util";

// selectors
const selectors = {

    //header
    hdrTopText: '.text-feature-heading',
    hdrLogoText: '.icon-logo',
    hdrSearchIcon: '.icon-search',
    hdrAccountIcon: '.icon-account',
    hdrHeartWishlistIcon: '.icon-wishlist',
    hdrNumberWishlist: '.topbadge:eq(0)', // the number of added to wishlist items. Appears when some item is added to wishlist
    hdrShoppingBagIcon: '.icon-shopping-bag',
    hdrShopBagHooverSubtotal: '.mini-cart-label', //elements that appears when hover on Shopping bag
    hdrShopBagHooverPrice: '.money:eq(0)',
    hdrShopBagHooverAddBtn: '.btn.btn-primary.tdf_cart_icon',
    hdrShopBagHooverCheckoutBtn: '.btn-tertiary',
    hdrGlobeIcon: '.icon-globe',
    hdrBurgerIcon: '.burger', // icon appears with the smaller size of browser's window

/*Explanation for reviewers evaluating this code: Depending on the product development strategy and developers' plans, 
different methods for selector can be chosen, such as based on finding specific text. I opted for a selector 
search method based on index since product names may change more frequently than the menu's structure. In this case,
we also have floating indexes in the menu selectors: If the browser is opened with a small window and the Burger menu 
is accessed, the parent elements will have index [0], and duplicates of these elements in the regular menu on a wide 
screen will have index [1]. Conversely, when the browser is opened with a wide screen, the parent menu elements will 
have index [0], and duplicates of these elements in the Burger menu will have index [1]. Since both menu types already 
have some differences and may evolve differently, to cover all possible test cases in the future, I decided to create 
separate variables for selectors for each menu (Burder menu and Header menu).
*/
        // >>>>>>>> Here will be selectors from Burger menu mode
    burgerTabMenu: '.mobile-navigation-tabs.top ul li:eq(0) a', 
    burgerTabAccount: '.mobile-navigation-tabs.top ul li:eq(1) a',
    chevronSign: '.icon-chevron-right-light', 
       //  BURGER > SUNGLASSES 
        burgerSunglasses: '.menu-item-sunglasses:eq(0) a:eq(0)',  
        burgerSunglShopByGender: '.menu-item-sunglasses:eq(0) a:eq(1)', // BURGER > SUNGLASSES > "Shop by Gender" section 
        burgerSunglShopWomen: '.menu-item-sunglasses:eq(0) a:eq(2)',
        burgerSunglShopMen: '.menu-item-sunglasses:eq(0) a:eq(3)',
        burgerSunglArrivals: '.menu-item-sunglasses:eq(0) a:eq(4)', // BURGER > SUNGLASSES > "New Season Arrivals" section
        burgerSunglArrivalsSpring22: '.menu-item-sunglasses:eq(0) a:eq(5)',
        burgerSunglCore: '.menu-item-sunglasses:eq(0) a:eq(6)', // BURGER > SUNGLASSES > "Core Collection" section
        burgerSunglHoliday: '.menu-item-sunglasses:eq(0) a:eq(7)', // BURGER > SUNGLASSES > "The Holiday Edit" section
        burgerSunglCollaborations: '.menu-item-sunglasses:eq(0) a:eq(8)', // BURGER > SUNGLASSES > "Collaborations" section
        burgerSunglAttico: '.menu-item-sunglasses:eq(0) a:eq(9)',
        burgerSunglAllRich: '.menu-item-sunglasses:eq(0) a:eq(10)',
        burgerSunglArea: '.menu-item-sunglasses:eq(0) a:eq(11)',
        burgerSunglDries: '.menu-item-sunglasses:eq(0) a:eq(12)',
        burgerSunglMagda: '.menu-item-sunglasses:eq(0) a:eq(13)',
        burgerSunglMattWill: '.menu-item-sunglasses:eq(0) a:eq(14)',
        burgerSunglPacoRab: '.menu-item-sunglasses:eq(0) a:eq(15)',
        burgerSunglRalfRusso: 'menu-item-sunglasses:eq(0) a:eq(16)',
        burgerSunglShape: '.menu-item.has-child:eq(3)', // BURGER > SUNGLASSES > "Shop by Shape" section
        burgerSunglShapeAviator: '.menu-item.has-child:eq(3) .sub-menu-container a:eq(0)',
        burgerSunglShapeAngular: '.menu-item.has-child:eq(3) .sub-menu-container a:eq(1)',
        burgerSunglShapeCatEye: '.menu-item.has-child:eq(3) .sub-menu-container a:eq(2)',
        burgerSunglShapeDFrame: '.menu-item.has-child:eq(3) .sub-menu-container a:eq(3)',
        burgerSunglShapeOval: '.menu-item.has-child:eq(3) .sub-menu-container a:eq(4)',
        burgerSunglShapeOversized: '.menu-item.has-child:eq(3) .sub-menu-container a:eq(5)',
        burgerSunglShapeRound: '.menu-item.has-child:eq(3) .sub-menu-container a:eq(6)',
        burgerSunglShapeRectang: '.menu-item.has-child:eq(3) .sub-menu-container a:eq(7)',
        burgerSunglShapeSquare: '.menu-item.has-child:eq(3) .sub-menu-container a:eq(8)',
        burgerSunglAccessories: '.menu-item:eq(6)', 
        // BURGER > OPTICALS
        burgerOpticals: '.menu-item-opticals:eq(0) a:eq(0)',
        burgerOpticShopByGender: '.menu-item-opticals:eq(0) a:eq(1)', // BURGER > OPTICALS > "Shop by Gender" section
        burgerOpticShopWomen: '.menu-item-opticals:eq(0) a:eq(2)',
        burgerOpticShopMen: '.menu-item-opticals:eq(0) a:eq(3)',
        burgerOpticNew: '.menu-item-opticals:eq(0) a:eq(4)', // BURGER > OPTICALS > "New in Opticals" section
        burgerOpticNewSpring22: '.menu-item-opticals:eq(0) a:eq(5)',
        burgerOpticCore : '.menu-item-opticals:eq(0) a:eq(6)', // BURGER > OPTICALS > "Core Collection" section
        burgerOpticLinear : '.menu-item-opticals:eq(0) a:eq(7)', // BURGER > OPTICALS > "Linear Optical Collection" section
        burgerOpticShape: '.menu-item-opticals:eq(0) a:eq(8)', // BURGER > OPTICAL > "Shop by Shape" section
        burgerOpticShapeAviator: '.menu-item-opticals:eq(0) a:eq(9)',
        burgerOpticShapeCatEye: '.menu-item-opticals:eq(0) a:eq(10)',
        burgerOpticShapeDFrame: '.menu-item-opticals:eq(0) a:eq(11)',
        burgerOpticShapeOval: '.menu-item-opticals:eq(0) a:eq(12)',
        burgerOpticShapeOversized: '.menu-item-opticals:eq(0) a:eq(13)',
        burgerOpticShapeRound: '.menu-item-opticals:eq(0) a:eq(14)',
        burgerOpticShapeSquare: '.menu-item-opticals:eq(0) a:eq(15)',
        // BURGER > COLLABORATIONS
        burgerCollabor: '.menu-item-collaborations:eq(0)',
        // BURGER > SUNGLASSES > "Accessories" section
        burgerAccessories: '.menu-item-accessories:eq(0) a:eq(0)',
        burgerAccessorChains: '.menu-item-accessories:eq(0) a:eq(1)',
        burgerAccessorScarves: '.menu-item-accessories:eq(0) a:eq(2)',
        burgerAccessorPouches: '.menu-item-accessories:eq(0) a:eq(3)',

        // BURGER > VIRTUAL TRY ON
        burgerVirtualTry: '.menu-item-virtual-try-on:eq(0)',
        // BURGER > REGION SELECT 
        burgerRegionSelect: '.has-child.d-lg-none a:eq(0)',
        burgerRegionUs: '.has-child.d-lg-none a:eq(1)',
        burgerRegionEu: '.has-child.d-lg-none a:eq(2)',
        burgerRegionINT: '.has-child.d-lg-none a:eq(3)',

        // >>>>>>>> Here will be selectors from regular HEADER menu mode (NOT BURGER!!!)
        hdrSunglasses: '.menu-item-sunglasses:eq(0) a:eq(0)', 
        hdrSunglByGender: '.sub-menu-title:eq(0)', // "BY GENDER" section
        hdrSunglByGenderWomen: '.sub-menu-title:eq(0) + ul a:eq(0)',
        hdrSunglByGenderMen: '.sub-menu-title:eq(0) + ul a:eq(1)',
        hdrSunglTheEdit: '.sub-menu-title:eq(1)', // "THE EDIT" section
        hdrSunglTheEditArrivals: '.sub-menu-title:eq(1) + ul a:eq(0)',
        hdrSunglTheEditSpring22: '.sub-menu-title:eq(1) + ul a:eq(1)',
        hdrSunglTheEditCore: '.sub-menu-title:eq(1) + ul a:eq(2)',
        hdrSunglTheEditCollaborAttico: '.sub-menu-title:eq(1) + ul a:eq(3)',
        hdrSunglTheEditLinear: '.sub-menu-title:eq(1) + ul a:eq(4)',
        hdrSunglTheEditHoliday: '.sub-menu-title:eq(1) + ul a:eq(5)',
        hdrSunglShape: '.sub-menu-title:eq(2)', // "Shop by shape" section
        hdrSunglShapeAngular: '.sub-menu-title:eq(2) + ul a:eq(0)',
        hdrSunglShapeAviator: '.sub-menu-title:eq(2) + ul a:eq(1)',
        hdrSunglShapeCatEye: '.sub-menu-title:eq(2) + ul a:eq(2)',
        hdrSunglShapeOval: '.sub-menu-title:eq(2) + ul a:eq(3)',
        hdrSunglShapeOversized: '.sub-menu-title:eq(2) + ul a:eq(4)',
        hdrSunglShapeRectang: '.sub-menu-title:eq(2) + ul a:eq(5)',
        hdrSunglShapeRound: '.sub-menu-title:eq(2) + ul a:eq(6)',
        hdrSunglShapeSquare: '.sub-menu-title:eq(2) + ul a:eq(7)',
        hdrSunglShapeDFrame: '.sub-menu-title:eq(2) + ul a:eq(8)',
        hdrSunglassImage: 'img[alt=""]:eq(0)', // image in header menu in Sunglass section
        hdrSunglImageLink: '.featured-menu-link:eq(0) a:eq(0)', // the link in image > in header menu in Sunglass section
        // HEADER > OPTICALS
        hdrOpticals: '.menu-item-opticals:eq(0) a:eq(0)',
        hdrOpticByGender: '.sub-menu-title:eq(3)', // HEADER > OPTICALS > "By Gender" section
        hdrOpticByGenderWomen: '.sub-menu-title:eq(3) + ul a:eq(0)',
        hdrOpticByGenderMen: 'sub-menu-title:eq(3) + ul a:eq(1)',
        hdrOpticTheEdit: '.sub-menu-title:eq(4)', // HEADER > OPTICALS > "THE EDIT" section
        hdrrOpticTheEditNew: '.sub-menu-title:eq(4) + ul a:eq(0)',
        hdrOpticTheEditNewSpring22: '.sub-menu-title:eq(4) + ul a:eq(1)',
        hdrOpticTheEditCore : '.sub-menu-title:eq(4) + ul a:eq(2)', 
        hdrOpticTheEditLinear : '.sub-menu-title:eq(4) + ul a:eq(3)', 
        hdrOpticShape: '.sub-menu-title:eq(5)', // HEADER > OPTICAL > "Shop by Shape" section
        hdrOpticShapeAviator: '.sub-menu-title:eq(5) + ul a:eq(0)',
        hdrOpticShapeCatEye: '.sub-menu-title:eq(5) + ul a:eq(1)',
        hdrOpticShapeDFrame: '.sub-menu-title:eq(5) + ul a:eq(2)',
        hdrOpticShapeOval: '.sub-menu-title:eq(5) + ul a:eq(3)',
        hdrOpticShapeOversized: '.sub-menu-title:eq(5) + ul a:eq(4)',
        hdrOpticShapeRound: '.sub-menu-title:eq(5) + ul a:eq(5)',
        hdrOpticShapeSquare: '.sub-menu-title:eq(5) + ul a:eq(6)',
        hdrOpticImage: 'img[alt=""]:eq(1)', // image in header menu in Optical section
        hdrSunglImageLink: '.featured-menu-link:eq(1) a:eq(0)', // link in image > in header menu in Optical section
        // HEADER > COLLABORATION
        hdrCollaboration: '.menu-item-collaborations:eq(0)',
        // HEADER > ACCESORIES
        hdrAccessories: '.menu-item-accessories:eq(0)',
        hdrAccessoriesAcc: '.sub-menu-title:eq(6)', // text, name of the section in Accessories menu. Not a link
        hdrAccessoriesChains: 'sub-menu-title:eq(6) + ul a:eq(0)',
        hdrAccessoriesPouches: 'sub-menu-title:eq(6) + ul a:eq(1)',
        hdrAccessoriesScarves: 'sub-menu-title:eq(6) + ul a:eq(2)',
        // HEADER > VIRTUAL TRY ON
        hdrVirtualTry: '.menu-item-virtual-try-on:eq(0)',

// body of the page
    // Top Left section
topLeftImage: '.product-detail__imageOne', 
    // Top right section
wishListHeart: '#wishlist_icon', // empty heart to add an item to wishlis
wishListPopupAddRemove: '#bookmarkit', // popup text when hover on heart
h1Text: '.product-title',
shortDescription: '.product-short-description', // the text right after title of the item
mainPrice: '.product-detail-price',
// 'choose colour' and 'plus/minus icon' are in function section
addToBasketBtn: '.btn-add-to-cart',
descriptionExpander: '.accordion-title:eq(0)', // the word DESCRIPTION that expands/collapses a description of the item
textDescription: '.rte:eq(0)', // block of the text description of the item
detailsExpander: '.accordion-title:eq(1)', // the word DETAILS that expands/collapses details of the item
detailsText: '.rte:eq(1)', //text for details of the item
SizeAndFitExpander: '.accordion-title:eq(2)', //the phrase SIZE & FIT that expands/collapses a description of available sizes the item
SizeAndFitText: '.rte:eq(2)',//text for sizes of the item
    //Bottom left section
bottomLeftImage: '.product-image.slick-slide.slick-current',
shiftImageIconActive: '#slick-slide-control00', //icon DOT for shifting images. Status Active 
shiftImageIconNext: '#slick-slide-control01', //icon DOT for shifting images. Status inactive

// Bottom right section
    // Payment section
visaIcon: 'img[alt="visa"]',
masterCardIcon: 'img[alt="master"]',
amexIcon: 'img[alt="american express"]',
maestroIcon: 'img[alt="maestro"]',
applePayIcon: 'img[alt="apple pay"]',
googlePayIcon: 'img[alt="google pay"]',
klarnaIcon: 'img[alt="klarna"]',
    //Social media section
facebookIcon: '.icon-facebook',
twitterIcon: '.icon-twitter',
pinterestIcon: '.icon-pinterest',
instagramIcon: '.icon-instagram',
youtubeIcon: '.icon-youtube',
weiboIcon: '.icon-weibo',
    // Subscribe section
inputField: '.needsclick.go4280710165',
subscribeBtn: '.needsclick.go596865934',
subscribeText1: '.footer-title:eq(0)',
subscribeText2: '.rte:eq(3)',
    //Footer section
ftrInformation: '.footer-title:eq(1)', // just text
ftrAboutUs: '.footer-links a:eq(0)',
ftrFaceShapeGuide: '.footer-links a:eq(1)',
ftrCurrentOffers: '.footer-links a:eq(2)',
ftrFAQ: '.footer-links a:eq(3)',
ftrPrivacyPolicy: '.footer-links a:eq(4)',
ftrCareers: '.footer-links a:eq(5)',
ftrTeams: '.footer-links a:eq(6)',
ftrService: '.footer-title:eq(2)', // just text
ftrDelivery: '.footer-links a:eq(7)',
ftrOurStores: '.footer-links a:eq(8)',
ftrContactUs: '.footer-links a:eq(9)',
ftrReturns: '.footer-links a:eq(10)',
ftrWarranty: '.footer-links a:eq(11)',
ftrRepairForm: '.footer-links a:eq(12)',
ftrLensReplace: '.footer-links a:eq(13)',
    // additional elements
cookiesText: '.wpcc-message:eq(3)',
cookiesLinkLearnMore: 'wpcc-privacy:eq(3)',
cookiesBtnAccept: 'wpcc-btn:eq(3)',
helpBtn: '.label-hQQwx',
helpBtnIcon: '.container-3-_vJ',
} 


// expected

/*
All expected values should be taken from the requirements. 
Below I have provided samples, how I fill out the expected section
*/

const expected = {
    //links
    url: 'https://stackadapt-interview.s3.amazonaws.com/support/Chrysler+Optical+A+D-Frame+in+Tortoiseshell+by+LINDA+FARROW+Linear+%E2%80%93+LINDA+FARROW+(U.S.).html',
    
    //texts
    titleTab: 'Chrysler Optical A D-Frame in Tortoiseshell',
    subTittleItem: 'Optical Lens in a TortoiseshellFrame',

    //buttons
    addBtn: 'Add to Basket',


    //placeholders
    subscribePlaceholder: 'Your Email Address',

    //hoover-on and popups
    addToWishlist: 'Remove from Wishlist',

    //colours and styles (if not provided from other Object Page)
    helpBtnBackground: 'rgb(9, 10, 6)',
}


// functions
const openPage = () => cy.visit(expected.url)
const glassesColour = (number) => cy.get(`.product-related-colours a:eq(${number+1}`); // template to call this function in our tests: nameOfThisPage.glassesColour(1).click()
const plusMinusIcon = (number) => cy.get(`.plus-minus-icon:eq(${number+1})`); // the icon, that animates when collapse/expand the description of item


// export section
export default {
    ...base,
    ...selectors,
    expected,
    openPage,
    glassesColour,
    plusMinusIcon,
}