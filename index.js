// fetchImagesAndShow = async () => {
// 	let galleryContainer = document.getElementById('gallery');

// 	let ind = 0;
// 	setTimeout(() => {
// 		for (const data of galleryData) {
// 			if (ind === 0) {
// 				galleryContainer.innerHTML = '';
// 			}
// 			galleryContainer.innerHTML += `
// 			    <div class="gallery-item">
// 			        <span class="material-icons-outlined close hidden">close</span>
// 			        <div class="content"><img src="${data.url}"></div>
// 			    </div>
// 			`;
// 			ind++;
// 		}

// 		galleryUI();
// 	}, 200);
// };

function galleryUI() {
	var gallery = document.querySelector('#gallery');
	var getVal = function (elem, style) {
		return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
	};
	var getHeight = function (item) {
		return item.querySelector('.content').getBoundingClientRect().height;
	};
	var resizeAll = function () {
		var altura = getVal(gallery, 'grid-auto-rows');
		var gap = getVal(gallery, 'grid-row-gap');
		gallery.querySelectorAll('.gallery-item').forEach(function (item) {
			var el = item;
			el.style.gridRowEnd =
				'span ' + Math.ceil((getHeight(item) + gap) / (altura + gap));
		});
	};
	gallery.querySelectorAll('img').forEach(function (item) {
		item.classList.add('byebye');
		if (item.complete) {
			console.log(item.src);
			var altura = getVal(gallery, 'grid-auto-rows');
			var gap = getVal(gallery, 'grid-row-gap');
			var gitem = item.parentElement.parentElement;
			gitem.style.gridRowEnd =
				'span ' + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
			item.classList.remove('byebye');
			if (item.clientHeight > item.clientWidth + 50) {
				item.classList.add('portrait');
			} else {
				item.classList.add('landscape');
			}
		} else {
			item.addEventListener('load', function () {
				console.log(true);
				var altura = getVal(gallery, 'grid-auto-rows');
				var gap = getVal(gallery, 'grid-row-gap');
				var gitem = item.parentElement.parentElement;
				gitem.style.gridRowEnd =
					'span ' +
					Math.ceil((getHeight(gitem) + gap) / (altura + gap));
				item.classList.remove('byebye');
				if (item.clientHeight > item.clientWidth + 50) {
					item.classList.add('portrait');
				} else {
					item.classList.add('landscape');
				}
			});
		}
	});
	window.addEventListener('resize', resizeAll);
	gallery.querySelectorAll('.gallery-item').forEach(function (item) {
		item.addEventListener('click', function () {
			item.classList.toggle('full');
			item.children[0].classList.toggle('hidden');
		});
	});

	let gr = document.getElementsByClassName('content');
	for (var i = 0; i < gr.length; i++) {
		gr[i].classList.add('gradient');
	}
}

galleryUI();
