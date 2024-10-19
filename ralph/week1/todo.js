const form=document.querySelector("form"),
  input = document.querySelector("input"),
  ul1=document.querySelector(".ul1"),
  ul2=document.querySelector(".ul2")
;
let idx_num = 0; // ul 요소 구별을 위한 첨자

form.addEventListener("submit",(event) => {
  event.preventDefault();

  if(input.value !== '')  // 빈텍스트를 쓰는 것을 막기 위한 코드
    {
    const li = document.createElement('li');
    idx_num++;
    li.setAttribute('id', "btn"+ idx_num);

    li.innerHTML = "<div>"+input.value+"<button class=\"btn"+idx_num+"\"onclick=\"ul1ButtonEvent(this.className)\">완료</button></div>"; // inner HTML

    ul1.appendChild(li); // list에 요소 추가

    input.value= ''; // 입력창 초기화

  }
});

// 
function ul2ButtonEvent(btn_className)
{
  const items = ul2.getElementsByTagName("li"); // 리스트 내 요소들 가져오기
  if(items.length>0){ // 요소 유무 구뵬
    for (i=0;i<items.length;i++){ // 요소 리스트 순회
      if(items[i].id==btn_className){ // 버튼 class와 id 비교하여 해당 요소 구별
        items[i].remove(); // 클릭된 요소 삭제
      }
    }
  }
}

function ul1ButtonEvent(btn_className)
{
  const items = ul1.getElementsByTagName("li");
  if(items.length>0){
    for (i=0;i<items.length;i++){
      if(items[i].id==btn_className){
        const newNode= items[i].cloneNode(true);

        items[i].remove();
        ul2.appendChild(newNode);
        
        var btn = document.querySelector("."+btn_className);
        btn.innerText = "삭제"
        btn.onclick = function (){
          ul2ButtonEvent(btn.className);
        };
      }
    }
  }
}






      // https://travelerfootprint.tistory.com/132 이게 유사한듯