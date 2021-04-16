# Path Planning Visualizer Project

Программный проект онлайн-визуализатор работы алгоритмов Дейкстры и А*.

# Онлайн запуск проекта

Сервер задеплоен при помощи github pages, поэтому сейчас достаточно перейти по ссылке https://danielshinoda.github.io/pathplanning/.

# Запуск через localhost

Клонируйте содержимое этого репозитория в нужную директорию при помощи Git bash'a. (В нужной директории Rightclick + Git Bash here)

```bash
git clone https://github.com/*account*/pathplanning.git
```

Чтобы запустить локально войдите в директорию проекта и пропишите

```bash
npm start
```

В браузере откроется вкладка http://localhost:3000. Если вы измените содержимое проекта локально, то локальный сайт автоматически обновится, а так же можно будет увидеть ошибки компиляции в консоли, если таковые имеются.

Для запуска в режиме тестирования пропишите в bash команду

```bash
npm test
```

Чтобы закоммитить обновления в ваш гитхаб репозиторий пропишите следующие команды в bash:

```bash
npm run deploy
git add .
git commit -m "First commit!"
git push
```

# Интерфейс сайта

На сайте расположено поле размера $n\times m$ вершин, а так же начальная клетка(зелёный квадрат) и конечная клетка(красный квадрат).

В верхней часте сайта прикреплена панель навигации, в которой расположены кнопки Clear path(очищает все клетки кроме начальной и конечной) и Visualize Algorithm(запускает алгоритм Дейкстры).

Присутствует так же кнопка Options, но она находится в разработке.

Посещённые клетки окрашиваются в голубой цвет, кратчайший путь в жёлтый цвет, стены чёрного цвета.

Чтобы поставить стены нужно зажать ЛКМ и передвигать, на том месте, где была мышь, появятся стены, чтобы остановить установку стен отпустите ЛКМ.

# В ближайшей разработке:

# Backend

Алгоритм A*, движение по диагонали, опции движения.

# Frontend

Рабочие кнопки, изменение начальной и конечной точек, установка корректного размера поля относительно устройства пользователя, настройка масштаба карты, описание интерфейса на сайте.
