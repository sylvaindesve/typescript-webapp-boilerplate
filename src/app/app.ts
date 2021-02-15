export class App {
  public run(): void {
    const title = document.querySelector("h1");
    if (title) {
      title.innerHTML = "Hello World !!";
    }
  }
}
