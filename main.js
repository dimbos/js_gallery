let sliderBody, btnLeft, btnRight, i, parts, vHeight, vWidth, slides, slideBlock, 
		transitionTime, urls, slide;

i = 0;
parts = 3;
sliderBody = _id('slider');
btnLeft = _id('btn-left');
btnRight = _id('btn-right');
transitionTime = 1;

vHeight = window.innerHeight;
vWidth = window.innerWidth;

urls = [
	'img/1.jpg',
	'img/2.jpg',
	'img/3.jpg',
];

window.onload = function(){
	createElements();
	//autoSlide();
};

window.addEventListener('resize', function(){
	vHeight = window.innerHeight;
	vWidth = window.innerWidth;

	createElements();
});

function createElements(){
	slide = _createEl('div');
	slide.className += 'slide-el';

	slideBlock = _createEl('div');
	slideBlock.className += 'slide-block slide-block-';
	slideBlock.style.width = vWidth + 'px';
	slideBlock.style.height = (vHeight / parts) + 'px';
	slideBlock.style['transition'] = 'left ' + transitionTime + 's';

	slideLayout();
}

function slideLayout(){
	sliderBody.innerHTML = '';
	for(let i = 0; i < urls.length; i++){
		sliderBody.appendChild(slide.cloneNode(true));
	};
	slides = _cl('slide-el');
	for(let i = 0; i < slides.length; i++){
		for(let x = 0; x < parts; x++){
		slides[i].appendChild(slideBlock.cloneNode(true));	
		}
		slides[i].className += ' slide-el-' + i + '';		
	};
	for(let i = 0; i < slides.length; i++){
		slides[i].style.zIndex = i;
		for(let x = 0; x < slides[i].children.length; x++){
			let transitionDelay = ((transitionTime / parts) / 2) * x;
			let offset = (x * (100/parts));
			slides[i].children[x].style.top = offset + '%';
			slides[i].children[x].innerHTML = "<img src=" + urls[i] + " style ='top: " + ((vHeight / parts)*-1)*x +"px'>";
			slides[i].children[x].style['transition-delay'] = transitionDelay + 's';
			}
	}

	addStyle();
}



btnLeft.addEventListener('click', function(){
	goLeft();
});

function goLeft(){
	let slides = _cl('slide-el');
	if(i > 0){
		i--;
		removeClass(slides[i + 1], 'opened');
	}
	else{
		i = urls.length - 1;
		for(let x = 0; x < urls.length; x++)
		{
			slides[x].className += ' opened';
		}
	}
};

btnRight.addEventListener('click', function(){
	goRight();
});

function goRight(){
	let slides = _cl('slide-el');
	if(i < urls.length -1){
		i++;
		slides[i].className += ' opened';
	}
	else{
		i = 0;
		for(let x = urls.length; x > 0; x--){
			removeClass(slides[x], 'opened');
		}
	}
};

function _createEl(el){
	return document.createElement(el);
};

function _id(el){
	return document.getElementById(el);
};

function _cl(el){
	return document.getElementsByClassName(el);
};

function addStyle(){
	let slides = _cl('slide-el');
	slides[i].className += ' opened';
};

function removeClass(el, _class) {
  if (el && el.className && el.className.indexOf(_class) >= 0) {
    var pattern = new RegExp('\\s*' + _class + '\\s*');
    el.className = el.className.replace(pattern, ' ');
  }
};

function autoSlide(){
	setInterval(function(){
		goRight();
	}, 2000);
};