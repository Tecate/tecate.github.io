class Menu extends HTMLElement {

	constructor(){
	
		super()
	
		this.shadow = this.attachShadow({mode: 'open'})
		
		this.addEventListener('click', e => {
			
			const menus = document.querySelectorAll('fos-menu')
			
			for(const menu of menus){
			
				menu.visible = false
				
			}
			
			this.visible = true
			
		
		});
		
		document.body.addEventListener('click', e => {
		
		if( e.target.localName !== 'fos-menu' )
		
			this.visible = false
		
		});
		
	}
	
  
  attributeChangedCallback(name, oldValue, newValue) {

		this.render()
  
  }
  
  connectedCallback() {
  
  	this.render()
  	
  }
  
	static get observedAttributes() {
	
    return ['name', 'visible']
    
  }

  get visible() {
  
    return this.hasAttribute('visible') ? true : false
    
  }
  
  set visible(val) {
  
    if(val)
    
      this.setAttribute('visible', true)
      
    else
    
      this.removeAttribute('visible')

  }
  
  get name() {
  
    return this.hasAttribute('name') ? this.getAttribute('name') : null
    
  }
  
  set name(val) {
  
    if (val)
    
      this.setAttribute('name', val)
      
    else
    
      this.removeAttribute('name')
 
  }

  render(){
  
  	this.shadow.innerHTML = `
			<style>
				:host{
					display: inline-block;
					cursor: default;
				}
				#menu{
					display: `+(this.visible ? 'block' : 'none')+`;
					position: absolute;
					`+(this.parentNode ? this.parentNode.position : 'bottom')+`: 26px;
					background-color: #C0C0C0;
					padding: 1em;
					border: solid 1px rgb(255,0,0);
					border-`+(this.parentNode ? this.parentNode.position : 'bottom')+`: 0;
				}
				#title:hover{
					color: gray;
					cursor: pointer;
				}
			</style>
			<div>
				<div id="title">${this.name}</div>
				<div id="menu"><slot></slot></div>
			</div>
		`;
		
  }
  
}

customElements.define('fos-menu', Menu)
