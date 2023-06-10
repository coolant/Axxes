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

        case this.backstagePasses.includes(item.name) && item.sellIn <= 10:
          const amount = this.calculatePassValue(item)
          this.increaseQuality(item, amount)
          break

        default:
          this.decreaseQuality(item, 1)
      }

      if (this.items[i].name != "B-DAWG Keychain") {
        this.items[i].sellIn = this.items[i].sellIn - 1
      }

      if (item.sellIn < 0) {
        if (item.name != "Good Wine") {
          if (
            item.name != "Backstage passes for Re:Factor" ||
            item.name != "Backstage passes for HAXX"
          ) {
            if (item.quality > 0) {
              if (item.name != "B-DAWG Keychain") {
                item.quality = item.quality - 1
              }
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }
    })
  }

  decreaseQuality(item, amount) {
    if (item.quality > 0) item.quality -= amount
  }

  increaseQuality(item, amount) {
    if (item.quality < 50) item.quality += amount
  }

  calculatePassValue(item) {
    if (item.sellIn >= 6) return 2

    if (item.sellIn <= 5) return 3
  }
}
