import logo from "assets/img/logo.png";
import imgslider1 from "assets/img/imgslider1.jpg";
import imgslider2 from "assets/img/imgslider2.jpg";
import imgslider3 from "assets/img/imgslider3.jpg";


const images = {
  logo,
  imgslider1,
  imgslider2,
  imgslider3
};
export default function(imageName) {
  return images[imageName];
}
