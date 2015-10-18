<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, max-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="/assets/libs/swiper/3.1.2/swiper.min.css">
    <style type="text/css">
    body {
        background: #eee;
        margin: 0;
        padding: 0;
    }

        .swiper-container {
            margin-top: 1px;
            height: 1.5cm;
        }

        .swiper-content {
            background: whitesmoke;
            text-align: center;
        }

        .swiper-wrapper > .delete {
            background: red;
        }

        .swiper-wrapper > .edit {
            background: orange;
        }

    </style>
    <script type="text/javascript" src="/assets/jquery-2.1.3.js"></script>
    <script type="text/javascript" src="/assets/libs/swiper/3.1.2/swiper.jquery.min.js"></script>
    <script type="text/javascript" src="/assets/libs/swipe_to_action/1.0.0/swipe_to_action.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            var swipeToAct = new SwipeToAction().init(2)
            swipeToAct.setOnContentClickedListener(function (lineIndex) {
                alert("clicked content: " + lineIndex)
            })
            swipeToAct.setOnActionClickedListener(function (lineIndex, actionIndex) {
                alert("clicked action: " + lineIndex + ", " + actionIndex)
            })
        })
    </script>
</head>
<body>
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-content"></div>
        <div class="swiper-action delete"></div>
        <div class="swiper-action edit"></div>
    </div>
</div>
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-content"></div>
        <div class="swiper-action delete"></div>
        <div class="swiper-action edit"></div>
    </div>
</div>
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-content"></div>
        <div class="swiper-action delete"></div>
        <div class="swiper-action edit"></div>
    </div>
</div>
</body>
</html>