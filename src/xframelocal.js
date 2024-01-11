// src/xframelocal.js
customElements.define('x-frame-bypass', class extends HTMLIFrameElement {
	constructor () {
		super();
	}
	connectedCallback () {
		this.load(this.src);
		this.src = '';
		this.sandbox = this.sandbox || 'allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation';
	}
	load (url, options) {
		if (!url || !url.startsWith('http')) 
			throw new Error(`X-Frame-Bypass src ${url} does not start with http(s)://`);
		console.log('X-Frame-Bypass loading:', url);
		fetch('https://cors-anywhere.herokuapp.com/' + url, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
			},
		})
		.then(res => res.text())
		.then(data => {
			this.srcdoc = data;
		})
		.catch(e => console.error('Cannot load X-Frame-Bypass:', e));
	}
}, { extends: 'iframe' });