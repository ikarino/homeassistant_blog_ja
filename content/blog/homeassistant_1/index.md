---
title: Home Assistantを使えるようにするまで その2
date: "2020-10-17T01:00:00.00Z"
description: "インストールに必要なものと環境について"
categories: [Home Assistant]
comments: true
image:
  feature: https://images.unsplash.com/photo-1440635592348-167b1b30296f?crop=entropy&dpr=2&fit=crop&fm=jpg&h=475&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1250
  credit: thomas shellberg
  creditlink: https://unsplash.com/photos/Ki0dpxd3LGc
---

以下のステップで Home Assistant を使えるようにしていきます。

1. **[必要なものと環境(本記事)](/homeassistant_1)**
2. [Raspberry Pi OS のセットアップ](/homeassistant_2)
3. [Home Assistant のインストール](/homeassistant_3)
4. [Addon のインストール](/homeassistant_4)

# 必要な環境

## 自宅 LAN

ご自宅に Wifi ルータはございますでしょうか？  
あるならばそれだけで大丈夫です。

> 引越しして驚いたのですが、最近の住宅は Wifi が埋め込まれていて、家賃も込みな物件がほとんどのようですね。昨今のテレワーク事情等を踏まえると当然なのでしょうか。  
> どの部屋、どんな場所でも Wifi に接続できるのは非常にありがたいですね。私の実家はトイレで 100%途切れていましたし、電子レンジを使っているときは自室に電波が届きませんでした 😩

## パソコン

ほぼ必須です。

Mac OS のパソコンがある場合は何も気にしなくて大丈夫です。  
今回はこちらで進めていきます。

Windows の場合は`ssh`接続できる環境が必要です。  
[TeraTerm](https://ja.osdn.net/projects/ttssh2/)等をインストールしていてください。

> スマートフォンやタブレットのアプリから`ssh`接続することもできます。小さい画面、キーボードで大変でしょうが、一応無理ではありません。

> パソコン無しで`Raspberry Pi`に直接ディスプレイやキーボードを接続してセットアップすることもできますが、ここでは紹介しません。

## くじけぬ心

ほぼ必須です 😉

ステップの途中で失敗して、1 からやり直すことも普通にあります。  
中途半端で投げ出さず、原因を特定してもう一度がんばってみてください。  
可能な限り私も記事内でお手伝いいたします。

# 必要なもの

## Raspberry Pi

[Raspberry Pi](https://ja.wikipedia.org/wiki/Raspberry_Pi)は小型・低消費電力なパソコンです。  
Home Assistant 用途としては最適です。  
[Home Assistant 公式](https://www.home-assistant.io/getting-started/)では Raspberry Pi 4 のメモリ 2GB 以上を推奨しています。

もし Home Assistant に飽きてしまっても、低消費電力サーバとして他にもいろいろな使い方がありますので 1 台持っておいても損はないと思います。  
私自身は Home Assistant 以外に以下の用途に使用しています。

- 会社のコロナ確認システム（毎日）への自動投入
- [Pi Hole](https://pi-hole.net/)(広告ブロックシステム)
- 運営中の他のブログへの自動投稿
- ファイルサーバ

私は下記リンクの楽天から購入しました。  
後述しますが、Raspberry Pi 初心者向けに付属品が同梱されているセット商品もありますので、十分吟味してから選択してください 😉

<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:504px;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:240px"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5b4f40.06b0df07.1d5b4f41.25b1e264/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fioplaza%2F1000-01698591-00000001%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><img src="https://hbb.afl.rakuten.co.jp/hgb/1d5b4f40.06b0df07.1d5b4f41.25b1e264/?me_id=1230072&item_id=10323606&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fioplaza%2Fcabinet%2Fopen17%2F4957180145969.jpg%3F_ex%3D240x240&s=240x240&t=picttext" border="0" style="margin:2px" alt="[商品価格に関しましては、リンクが作成された時点と現時点で情報が変更されている場合がございます。]" title="[商品価格に関しましては、リンクが作成された時点と現時点で情報が変更されている場合がございます。]"></a></td><td style="vertical-align:top;width:248px;"><p style="font-size:12px;line-height:1.4em;text-align:left;margin:0px;padding:2px 6px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5b4f40.06b0df07.1d5b4f41.25b1e264/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fioplaza%2F1000-01698591-00000001%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  >IO DATA UD-RP4B2　Raspberry Pi 4メインボード</a><br><span >価格：5918円（税込、送料無料)</span> <span style="color:#BBB">(2020/10/17時点)</span></p><div style="margin:10px;"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5b4f40.06b0df07.1d5b4f41.25b1e264/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fioplaza%2F1000-01698591-00000001%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><img src="https://static.affiliate.rakuten.co.jp/makelink/rl.svg" style="float:left;max-height:27px;width:auto;margin-top:0"></a><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5b4f40.06b0df07.1d5b4f41.25b1e264/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fioplaza%2F1000-01698591-00000001%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><div style="float:right;width:41%;height:27px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:500;line-height:27px;margin-left:1px;padding: 0 12px;border-radius:16px;cursor:pointer;text-align:center;">楽天で購入</div></a></div></td></tr></table></div><br><p style="color:#000000;font-size:12px;line-height:1.4em;margin:5px;word-wrap:break-word"></p></td></tr></table>

## micro SD カード

Raspberry Pi は HDD や SSD の代わりに micro SD を使用しています。  
長期間連続で運用することを考えると、少々高価でも耐久性の高いものや保証期間の長いものを選んだほうがいいかもしれません。そこまで値のはるものでもありませんが笑  
[Home Assistant 公式](https://www.home-assistant.io/getting-started/)でも A2 対応の 32GB 以上の容量のものを推奨しています。

**初回のインストール時のみですが、上記パソコンで読み込むための SD カードリーダがない場合、別途準備する必要があります。ご注意ください。**

私は Raspberry pi 同様に楽天から購入しました。

> [お買い物マラソン](https://event.rakuten.co.jp/campaign/point-up/marathon/)の対象となる 1,000 円以上の商品でラッキーでした。

<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:504px;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:240px"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bb4ba.f2d2cf93.1d5bb4bb.40303092/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fspd-shop%2Fsatf128g-qxvf%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><img src="https://hbb.afl.rakuten.co.jp/hgb/1d5bb4ba.f2d2cf93.1d5bb4bb.40303092/?me_id=1320091&item_id=10000683&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fspd-shop%2Fcabinet%2F06516856%2Fimgrc0084223368.jpg%3F_ex%3D240x240&s=240x240&t=picttext" border="0" style="margin:2px" alt="" title=""></a></td><td style="vertical-align:top;width:248px;"><p style="font-size:12px;line-height:1.4em;text-align:left;margin:0px;padding:2px 6px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bb4ba.f2d2cf93.1d5bb4bb.40303092/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fspd-shop%2Fsatf128g-qxvf%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  >microSDXC 128GB SanDisk サンディスク UHS-I U3 V30 4K A2対応 Class10 R:160MB/s W:90MB/s Nintendo Switch 動作確認済 海外パッケージ SATF128NA-QXA1 送料無料</a></p><div style="margin:10px;"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bb4ba.f2d2cf93.1d5bb4bb.40303092/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fspd-shop%2Fsatf128g-qxvf%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><img src="https://static.affiliate.rakuten.co.jp/makelink/rl.svg" style="float:left;max-height:27px;width:auto;margin-top:0"></a><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bb4ba.f2d2cf93.1d5bb4bb.40303092/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fspd-shop%2Fsatf128g-qxvf%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><div style="float:right;width:41%;height:27px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:500;line-height:27px;margin-left:1px;padding: 0 12px;border-radius:16px;cursor:pointer;text-align:center;">楽天で購入</div></a></div></td></tr></table></div><br><p style="color:#000000;font-size:12px;line-height:1.4em;margin:5px;word-wrap:break-word"></p></td></tr></table>

## AC 電源アダプタ

Raspberry Pi は常に AC アダプタでコンセントにつなぐか、モバイルバッテリーにつなぎつづける使い方になります。  
低消費電力といってもそれなりにパワフルな CPU を搭載していますので、モバイルバッテリーでは少々心もとないと思います。

Raspberry Pi 3 は micro usb、Raspberry Pi 4 は Type-C なので購入時はご注意ください。

もうお分かりかと思いますが、楽天から購入しました笑

<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:504px;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:240px"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bbb25.6c48a934.1d5bbb26.523356ca/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fakibaoo-r%2Fhm000592177%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><img src="https://hbb.afl.rakuten.co.jp/hgb/1d5bbb25.6c48a934.1d5bbb26.523356ca/?me_id=1248280&item_id=10644817&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fakibaoo-r%2Fcabinet%2Fgi1184%2F4528483237554.jpg%3F_ex%3D240x240&s=240x240&t=picttext" border="0" style="margin:2px" alt="" title=""></a></td><td style="vertical-align:top;width:248px;"><p style="font-size:12px;line-height:1.4em;text-align:left;margin:0px;padding:2px 6px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bbb25.6c48a934.1d5bbb26.523356ca/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fakibaoo-r%2Fhm000592177%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  >【Raspberry Pi】Raspberry Pi 4用 ACアダプタ PWS 5V 3A TypeC 1m JASK-0387C UU3180530</a></p><div style="margin:10px;"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bbb25.6c48a934.1d5bbb26.523356ca/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fakibaoo-r%2Fhm000592177%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><img src="https://static.affiliate.rakuten.co.jp/makelink/rl.svg" style="float:left;max-height:27px;width:auto;margin-top:0"></a><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bbb25.6c48a934.1d5bbb26.523356ca/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fakibaoo-r%2Fhm000592177%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><div style="float:right;width:41%;height:27px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:500;line-height:27px;margin-left:1px;padding: 0 12px;border-radius:16px;cursor:pointer;text-align:center;">楽天で購入</div></a></div></td></tr></table></div><br><p style="color:#000000;font-size:12px;line-height:1.4em;margin:5px;word-wrap:break-word"></p></td></tr></table>

## 放熱ケース

Raspberry Pi にはパソコンのように冷却用のファンは付属していません。  
また、基板はむき出しで、ほこりを集め放題です。

日かげや風通しのいい場所において耐える手もありますが、格好いい放熱機能付きのケースが売られていますので、お好きなものをチョイスしてはいかがでしょうか。

私は以下のものを購入しました。  
めちゃめちゃかっこいいですし、CPU 温度も 50℃ 以下で維持できています。

<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:504px;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:240px"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bbe1a.1c2177c6.1d5bbe1b.c6d09d70/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frobotshopjapan%2Frb-dfr-833%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><img src="https://hbb.afl.rakuten.co.jp/hgb/1d5bbe1a.1c2177c6.1d5bbe1b.c6d09d70/?me_id=1344564&item_id=10007679&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Frobotshopjapan%2Fcabinet%2Fproduct_images%2Fdfr%2Frbdfr833.jpg%3F_ex%3D240x240&s=240x240&t=picttext" border="0" style="margin:2px" alt="" title=""></a></td><td style="vertical-align:top;width:248px;"><p style="font-size:12px;line-height:1.4em;text-align:left;margin:0px;padding:2px 6px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bbe1a.1c2177c6.1d5bbe1b.c6d09d70/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frobotshopjapan%2Frb-dfr-833%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  >Raspberry Pi 4 B用ヒートシンク/ファン搭載メタルケース</a></p><div style="margin:10px;"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bbe1a.1c2177c6.1d5bbe1b.c6d09d70/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frobotshopjapan%2Frb-dfr-833%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><img src="https://static.affiliate.rakuten.co.jp/makelink/rl.svg" style="float:left;max-height:27px;width:auto;margin-top:0"></a><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5bbe1a.1c2177c6.1d5bbe1b.c6d09d70/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Frobotshopjapan%2Frb-dfr-833%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><div style="float:right;width:41%;height:27px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:500;line-height:27px;margin-left:1px;padding: 0 12px;border-radius:16px;cursor:pointer;text-align:center;">楽天で購入</div></a></div></td></tr></table></div><br><p style="color:#000000;font-size:12px;line-height:1.4em;margin:5px;word-wrap:break-word"></p></td></tr></table>

## LAN ケーブル

Wifi でもなんとかなりますが、LAN ケーブルで接続する前提で進めていきます。

## 初心者用スターターキットについて

ここまでに説明した以下の商品プラス α がセットになったスターターキットがたくさん販売されています。  
BTO パソコン等でもありがちですが、変な海外メーカの製品が同梱されたりするリスクを避けたほうがいいともいます。自信を持って紹介できる商品はありません。  
また、OS インストールは失敗しては繰り返すと思いますので、インストール済なことに価値は無いです。

1. Raspberry Pi 本体
2. micro SD(OS インストール済)
3. AC アダプタ
4. ケース、放熱用フィン等
