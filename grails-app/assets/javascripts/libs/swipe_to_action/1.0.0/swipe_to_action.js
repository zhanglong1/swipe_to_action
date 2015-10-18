/**
 * 
 * Author: zhanglong <wxzhanglong@163.com>
 * Created: 2015-10-09
 */

/**
 * This util is used to simulate swipe-to-action.
 */
function SwipeToAction() {
    this._actionCountEachLine = undefined
    this._currentOpenedSwiper = undefined
    this._onContentClickedListener = undefined
    this._onActionClickedListener = undefined
    this._allSwiperContainers = undefined
}

/**
 * Initialize this util and return itself.
 * @param  {number} actionCountEachLine the number of actions in each line
 * @return {object} the util it self
 */
SwipeToAction.prototype.init = function (actionCountEachLine) {
    var self = this

    self._allSwiperContainers = $(".swiper-container")
    self._actionCountEachLine = actionCountEachLine
    self._mapSelectorsToSwiper()
    self._refineTheWidthOfSlides()
    self._initSwiper()
    return self
}

/**
 * Set a listener for on-content-clicked event. Pass "undefined" if you want to detach the listener.
 * @param {function} listener has the signature: function (lineIndex)
 */
SwipeToAction.prototype.setOnContentClickedListener = function (listener) {
    this._onContentClickedListener = listener
}

/**
 * Set a listener for on-action-clicked event. Pass "undefined" if you want to detahc the listener.
 * @param {function} listener has the signature: function (lineIndex, actionIndex)
 */
SwipeToAction.prototype.setOnActionClickedListener = function (listener) {
    this._onActionClickedListener = listener
}

/***********************************************************
 *                          private
 **********************************************************/

/**
 * Map corresponding selectors to swiper(the swiper library) selectors:
 * ".swiper-content" -> ".swiper-slide"
 * ".swiper-action" -> ".swiper-slide"
 * @return {boolean} true if succeed, false otherwise
 */
 SwipeToAction.prototype._mapSelectorsToSwiper = function () {
    var actions = $(".swiper-action")
    if (actions.size() <= 0) {
        console.log("warning: no swiper action found!")
    } else {
        actions.each(function (index) {
            $(this).addClass("swiper-slide")
        })
    }

    var contents = $(".swiper-content")
    if (contents.size() <= 0) {
        console.log("warning: no swiper content found!")
    } else {
        contents.each(function (index) {
            $(this).addClass("swiper-slide")
        })
    }

    return true
 }

/**
 * Refine the width of all swiper actions according to its number in order to make the actions:
 * 1. the first one in the middle in horizontal
 * 2. the last one clings to the right edge
 * 
 * @return {boolean} true if succeed, false otherwise
 */
SwipeToAction.prototype._refineTheWidthOfSlides = function () {
    var self = this

    // Get all actions
    var actions = $(".swiper-action")
    if (actions.size() <= 0) {
        return false
    }

    // Calculate the best width percentage of each action
    var actionWidthPercent = 1.0 / (2 * self._actionCountEachLine - 1)

    // Now refine the width of all actions
    actions.each(function (index) {
        $(this).css("width", actionWidthPercent * 100 + "%")
    })

    return true
 }

/**
 * Initialize the swiper library, it must be called after SwiperToAction._mapSelectorsToSwiper().
 * @return {boolean} true if succeed, false otherwise
 */
 SwipeToAction.prototype._initSwiper = function () {
    var self = this
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: false,
        spaceBetween: 0,
        longSwipes: false,
        onSlideChangeStart: function (swiper) {
            if (1 == swiper.activeIndex) {
                swiper.lockSwipeToNext()
            } else {    
                swiper.unlockSwipeToNext()
            }
        },
        onSlideChangeEnd: function (swiper) {
            if (1 < swiper.activeIndex) {
                swiper.slideTo(1)
            }
            if (0 != swiper.activeIndex) {
                self._currentOpenedSwiper = swiper
            } else {
                self._currentOpenedSwiper = undefined
            }
        },
        onTouchEnd: function (swiper, event) {
            if (self._currentOpenedSwiper) {
                self._currentOpenedSwiper.slideTo(0)
                return
            }
            if (1 == swiper.activeIndex && 'next' == swiper.swipeDirection) {
                swiper.slideTo(1, 100, true)
            }
        },
        onClick: function (swiper, event) {
            if (!self._currentOpenedSwiper) {
                // No line has been opened
                self._onContentClickedListener && self._onContentClickedListener(self._allSwiperContainers.index($(swiper.container)))
            } else if (self._currentOpenedSwiper == swiper) {
                // The clicked line is the opened line
                if (swiper.clickedIndex == 0) {// The content of the opened line is clicked
                    self._currentOpenedSwiper.slideTo(0)
                } else {// One of the actions of the opened line is clicked
                    self._onActionClickedListener && self._onActionClickedListener(self._allSwiperContainers.index($(swiper.container)), swiper.clickedIndex - 1)
                }
            } else {
                // The clicked line is not the line that is opened
                self._currentOpenedSwiper.slideTo(0)
            }
            self._currentOpenedSwiper = undefined
        }
    })
    return true
 }