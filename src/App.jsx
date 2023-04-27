import { useState } from 'react';
import './App.css';

const data = [
  {
    id: 1,
    title: 'Лендинг',
    price: 20000,
    subselectors: [
      {
        id: 1,
        title: 'Настройка рекламы',
        price: 10000,
      },
      {
        id: 2,
        title: 'Настройка SEO',
        price: 15000,
      },
    ],
  },
  {
    id: 2,
    title: 'Мобильные приложения',
    price: 300000,
    subselectors: [
      {
        id: 1,
        title: 'Продвижение в Google Play',
        price: 50000,
      },
      {
        id: 2,
        title: 'Продвижение в AppStore',
        price: 60000,
      },
    ],
  },
  {
    id: 3,
    title: 'Интернет магазин',
    price: 100000,
    subselectors: [
      {
        id: 1,
        title: 'Настройка рекламы',
        price: 40000,
      },
      {
        id: 2,
        title: 'Настройка SEO',
        price: 55000,
      },
    ],
  },
];

function App() {
  const [pickedSelectorIds, setPickedSelectorIds] = useState([]);
  const [pickedSubselectorIds, setPickedSubselectorIds] = useState([]);
  const [summ, setSumm] = useState(0);

  const onSelectorClick = selector => {
    setPickedSelectorIds([]);
    setPickedSubselectorIds([]);

    setSumm(selector.price);
    setPickedSelectorIds(prevState => [...prevState, selector.id]);
  };

  const onSubselectorClick = subselector => {
    const subselectorPicked = Boolean(pickedSubselectorIds.find(p => p === subselector.id));

    if (!subselectorPicked) {
      setPickedSubselectorIds(prevState => [...prevState, subselector.id]);
      setSumm(prevState => prevState + subselector.price);
    } else {
      setPickedSubselectorIds(prevState => [...prevState.filter(p => p !== subselector.id)]);
      setSumm(prevState => prevState - subselector.price);
    }
  };

  const pickedSelectorClass = selector => {
    const selectorPicked = Boolean(pickedSelectorIds.find(id => id === selector.id));

    if (!selectorPicked) {
      return '';
    }

    return 'selector-selected';
  };

  const pickedSubselectorClass = subselector => {
    const subSelectorPicked = Boolean(pickedSubselectorIds.find(id => id === subselector.id));

    if (!subSelectorPicked) {
      return '';
    }

    return 'subselector-selected';
  };

  const activeSubselectorClass = selector => {
    const selectorPicked = Boolean(pickedSelectorIds.find(id => id === selector.id));

    if (!selectorPicked) {
      return '';
    }

    return 'subselectors-show';
  };

  return (
    <div className={'App'}>
      <h1 className="title">Калькулятор стоимости проекта</h1>
      <p className="subtitle">Узнайте стоимость вашего проекта</p>

      <div className="selectors">
        {data.map(selector => (
          <div key={selector.id} className={'selector-item'}>
            <div
              onClick={() => onSelectorClick(selector)}
              className={`selector-title selector-text ${pickedSelectorClass(selector)}`}
            >
              {selector.title}
            </div>

            <div className={`subselectors ${activeSubselectorClass(selector)}`}>
              {selector.subselectors.map(subselector => (
                <div
                  key={subselector.id}
                  onClick={() => onSubselectorClick(subselector)}
                  className={`selector-subtitle subselector-text ${pickedSubselectorClass(
                    subselector,
                  )}`}
                >
                  {subselector.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="summ">Итого: ${summ}</div>
    </div>
  );
}

export default App;
