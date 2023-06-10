import { SmellyItem } from "./enums/smellyItem"
import { Wine } from "./enums/wine"
import { LegendaryItem } from "./enums/legendaryItem"
import { BackstagePass } from "./enums/backstagePass"

export class GildedTros {
  constructor(items) {
    this.items = items
    this.smellyItems = [
      SmellyItem.LongMethods,
      SmellyItem.UglyVariableNames,
      SmellyItem.DuplicateCode,
    ]
    this.wines = [Wine.GoodWine]
    this.backstagePasses = [BackstagePass.ReFactor, BackstagePass.HAXX]
    this.legendaryItems = [LegendaryItem.BDawgKeychain]
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (this.legendaryItems.includes(item)) {
        return
      }

      switch (item) {
        case this.wines.includes(item.name):
          this.increaseQuality(item, 1)
          break

        case this.smellyItems.includes(item.name):
          this.decreaseQuality(item, 2)
          break

        case this.backstagePasses.includes(item.name):
          const amount = this.calculatePassValue(item)
          this.increaseQuality(item, amount)
          break

        default:
          this.decreaseQuality(item, 1)
          break
      }

      this.decreaseSellIn(item, 1)
    })
  }

  decreaseSellIn(item, amount) {
    item.sellIn -= amount
  }

  decreaseQuality(item, amount) {
    if (this.backstagePasses.includes(item.name) && item.sellIn < 0)
      item.quality = 0

    if (item.quality > 0) item.quality -= amount * (item.sellIn < 0 ? 2 : 1)
  }

  increaseQuality(item, amount) {
    if (item.quality < 50) item.quality += amount
  }

  calculatePassValue(item) {
    if (item.sellIn > 10) return 0

    if (item.sellIn >= 6 && item.sellIn <= 10) return 2

    if (item.sellIn <= 5) return 3
  }
}
