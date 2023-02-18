const buttons = [...document.querySelectorAll('.activity-tracker__option')];
let data = [];

const listenToButtons = (array) => {
  array.forEach((button) => {
    button.addEventListener('click', () => {
      activateClickedButton(button);
      const clickedOption = button.dataset.option;
      renderCard(clickedOption);
    });
  });
};

const activateClickedButton = (button) => {
  buttons.forEach((b) => b.classList.remove('active'));
  button.classList.add('active');
};

const loadData = async () => {
  // Fetch data
  const response = await fetch('./data.json');
  const fetchedData = await response.json();
  data = fetchedData;
  buttons[1].click();
};

const clearActivities = () => {
  // Clear All activity in html
  const activities = document.querySelectorAll('.activity-tracker__activity');
  activities.forEach((a) => a.remove());
};

const renderCard = async (clickedOption) => {
  clearActivities();
  const activityTracker = document.querySelector('section.activity-tracker');

  const calcTimeFrame = (option) => {
    if (option === 'daily') {
      return 'Yesterday';
    } else if (option === 'weekly') {
      return 'Last Week';
    } else if (option === 'monthly') {
      return 'Last Month';
    }
  };

  data.forEach((activity) => {
    const name = activity.title;
    const activityClass = name.toLowerCase().replace(' ', '-');
    const timeFrameData = activity.timeframes[clickedOption];
    const previousTimeFrame = calcTimeFrame(clickedOption);
    const section = document.createElement('section');
    section.classList.add('activity-tracker__activity', activityClass);
    const stringToInject = `<div class="activity-bg">
        <img src="./images/icon-${activityClass}.svg" alt="" />
      </div>
      <div class="activity-info">
        <div class="activity-header">
          <h2 class="activity-name">${name}</h2>
          <div class="activity-options">
            <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fill="#BBC0FF"
                fill-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div class="activity-content">
          <h3 class="current">${timeFrameData.current}hrs</h3>
          <p class="previous">${previousTimeFrame} - ${timeFrameData.previous}hrs</p>
        </div>
      </div>`;
    section.innerHTML = stringToInject;
    activityTracker.append(section);
  });
};

listenToButtons(buttons);
loadData();
