class Cronometer {
  constructor(callback) {
    this.time = {
      hour: 0,
      minute: 0,
      second: 0,
    };
    this.activeCronometer = false;
    this.intervalId = null;
    this.callback = callback;
  }

  init() {
    if (this.activeCronometer) return;
    this.intervalId = setInterval(() => {
      this.time.second++;
      if (this.time.second == 60) {
        this.time.second = 0;
        this.time.minute++;
        if (this.time.minute == 60) {
          this.time.minute = 0;
          this.time.hour++;
          if (this.time.hour == 24) {
            this.time.hour = 0;
          }
        }
      }
      this.callback(this.time);
    }, 1000);
    this.activeCronometer = true;
  }
  pause() {
    if (!this.activeCronometer) return;
    clearInterval(this.intervalId);
    this.activeCronometer = false;
  }

  restore() {
    this.pause();
    this.time = {
      hour: 0,
      minute: 0,
      second: 0,
    };
    this.callback(this.time);
  }
  getTime() {
    return `${String(this.time.hour).padStart(2, "0")}:${String(
      this.time.minute
    ).padStart(2, "0")}:${String(this.time.second).padStart(2, "0")}`;
  }
}

const createExercise = ({ numberExercise, cronometer }) => {
  const elementArticle = document.createElement("article");
  elementArticle.classList.add("articulo_ejercicio");
  const elementH2 = document.createElement("h2");
  elementH2.innerHTML = `Ejercicio N° ${numberExercise}`;

  const elementButtonCreateSerie = document.createElement("button");
  elementButtonCreateSerie.appendChild(document.createTextNode("Crear Serie"));
  elementButtonCreateSerie.classList.add("btn-primary");
  elementButtonCreateSerie.addEventListener("click", () => {
    elementUl.appendChild(
      createSerie({
        numberSerie: elementUl.childNodes.length + 1,
        timeCronometer: cronometer.getTime(),
      })
    );
  });

  const elementButton = document.createElement("button");
  elementButton.classList.add("btn-danger");
  elementButton.appendChild(document.createTextNode("Eliminar Ejercicio"));
  elementButton.addEventListener("click", (e) => {
    e.target.parentNode.remove();
    updateTitleOfExercises();
  });

  const elementUl = document.createElement("ul");

  elementArticle.appendChild(elementH2);
  elementArticle.appendChild(elementButtonCreateSerie);
  elementArticle.appendChild(elementButton);
  elementArticle.appendChild(elementUl);

  return elementArticle;
};

const createSerie = ({ numberSerie, timeCronometer }) => {
  const elementLi = document.createElement("li");
  elementLi.innerHTML = `${numberSerie}°Serie ${timeCronometer}`;

  const elementButton = document.createElement("button");
  elementButton.classList.add("btn-danger");
  elementButton.appendChild(document.createTextNode("X"));
  elementButton.addEventListener("click", (e) => {
    const elementLi = e.target.parentNode.parentNode;
    e.target.parentNode.remove();
    updateTitleOfSeries(elementLi);
  });

  elementLi.appendChild(elementButton);
  return elementLi;
};

const updateTitleOfExercises = () => {
  document.querySelectorAll("#container h2").forEach((elementH2, index) => {
    elementH2.innerHTML = `Ejercicio N° ${index + 1}`;
  });
};

const updateTitleOfSeries = (elementParent) => {
  elementParent.childNodes.forEach((element, index) => {
    element.firstChild.textContent = element.firstChild.textContent.replace(
      /^.*?(?=°)/,
      index + 1
    );
  });
};

const updateCronometer = ({ hour, minute, second }) => {
  cronometer.innerHTML = `${String(hour).padStart(2, "0")}:${String(
    minute
  ).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
};

const page = () => {
  const cronometer = new Cronometer(updateCronometer);
  document.getElementById("startCronometer").addEventListener("click", () => {
    cronometer.init();
  });
  document.getElementById("pauseCronometer").addEventListener("click", () => {
    cronometer.pause();
  });
  document.getElementById("restoreCronometer").addEventListener("click", () => {
    cronometer.restore();
  });
  document.getElementById("createExercise").addEventListener("click", () => {
    const container = document.getElementById("container");
    container.appendChild(
      createExercise({
        numberExercise: container.childNodes.length + 1,
        cronometer,
      })
    );
  });
};

window.onload = () => {
  page();
};

window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
});
