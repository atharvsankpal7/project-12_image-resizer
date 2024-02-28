let imageholder = document.getElementsByClassName("img")[0];
let image = imageholder.getElementsByTagName("img")[0];
let source_image = imageholder.getElementsByTagName("input")[0];
let Ogheight = document.getElementById("height-input");
let OGwidth = document.getElementById("width-input");
let aspect_ratio = document.getElementById("aspect_ratio");
let download = document.getElementsByClassName("download")[0];
let quality = document.getElementById("quality_reduce");

let ogAR;
let loadFile = (e) => {
    let file = e.target.files[0];
    if (!file) return;
    image.src = URL.createObjectURL(file);
    console.log(image.src);
    imageholder.classList.add("active");
    Ogheight.value = image.naturalHeight;
    console.log(Ogheight.value)
    OGwidth.value = image.naturalWidth;
    console.log(OGwidth.value)
    ogAR = image.naturalWidth / image.naturalHeight;
};
OGwidth.addEventListener("keyup", () => {
    const height = aspect_ratio.checked ? OGwidth.value / ogAR : Ogheight.value;
    Ogheight.value = Math.floor(height);
});
Ogheight.addEventListener("keyup", () => {
    const width = aspect_ratio.checked ? Ogheight.value * ogAR : OGwidth.value;
    OGwidth.value = Math.floor(width);
});
download.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    let a = document.createElement("a");
    let quality_reduce = 1;
    quality.checked ? (quality_reduce = 0.7) : (quality_reduce = 1);
    let ctx = canvas.getContext("2d");
    canvas.width = OGwidth.value;
    canvas.height = Ogheight.value;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL("image/jpeg",quality_reduce);
    a.download = new Date().getTime();
    a.click();
});
source_image.addEventListener("change", loadFile);
imageholder.addEventListener("click", () => source_image.click());
