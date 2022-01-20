export class AddScript {
    add(url: string) {
        let body = <HTMLDivElement>document.body;
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = true;
        script.defer = true;
        body.appendChild(script);
    }
    addFirst(url: string) {
        let body = <HTMLDivElement>document.body;
        let scripts = document.getElementById('scripts');
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = true;
        script.defer = true;
        scripts.insertBefore(script, scripts.firstChild);
    }
    addAfterChild(url: string, parent: HTMLElement) {
        let body = <HTMLDivElement>document.body;
        let scripts = document.getElementById('scripts');
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = true;
        script.defer = true;
        parent.appendChild(script);
    }
}