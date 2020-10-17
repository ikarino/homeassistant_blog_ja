---
title: Home Assistantを使えるようにするまで その1
date: "2020-10-17T00:00:00.00Z"
description: "Home Assistantの概要とインストールの流れについて紹介します"
categories: [Home Assistant]
comments: true
image:
  feature: https://images.unsplash.com/photo-1440635592348-167b1b30296f?crop=entropy&dpr=2&fit=crop&fm=jpg&h=475&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1250
  credit: thomas shellberg
  creditlink: https://unsplash.com/photos/Ki0dpxd3LGc
---

引越しを機に再セットアップしようということで、備忘録を兼ねて書いていきます。

# Home Assistant とは

[Home Assistant](https://www.home-assistant.io/)はオープンソースのホームオートメーションシステムです。Google Home/Amazon Alexa 等で簡単にセットアップするホームオートメーションもありますが、もっと細かな制御をしたかったり、対応していない家電を自動化したいときにおすすめです。

何ができるようになるのか知りたい方は以下の Youtube 動画を御覧ください。
[![](https://img.youtube.com/vi/v1c393EJ5ww/0.jpg)](https://www.youtube.com/watch?v=v1c393EJ5ww)

常時起動しておく必要があるため、サーバが必要になります。VPN を活用して AWS 等にインストールすることも可能でしょうが、制御権をのっとられるリスクを考えると自宅 LAN 内で完結させるのがベストです。低消費電力な Raspberry Pi や Intel NUC がインストール先のハードウェア候補になります。

<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:504px;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:240px"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5b4f40.06b0df07.1d5b4f41.25b1e264/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fioplaza%2F1000-01698591-00000001%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><img src="https://hbb.afl.rakuten.co.jp/hgb/1d5b4f40.06b0df07.1d5b4f41.25b1e264/?me_id=1230072&item_id=10323606&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fioplaza%2Fcabinet%2Fopen17%2F4957180145969.jpg%3F_ex%3D240x240&s=240x240&t=picttext" border="0" style="margin:2px" alt="[商品価格に関しましては、リンクが作成された時点と現時点で情報が変更されている場合がございます。]" title="[商品価格に関しましては、リンクが作成された時点と現時点で情報が変更されている場合がございます。]"></a></td><td style="vertical-align:top;width:248px;"><p style="font-size:12px;line-height:1.4em;text-align:left;margin:0px;padding:2px 6px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5b4f40.06b0df07.1d5b4f41.25b1e264/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fioplaza%2F1000-01698591-00000001%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  >IO DATA UD-RP4B2　Raspberry Pi 4メインボード</a><br><span >価格：5918円（税込、送料無料)</span> <span style="color:#BBB">(2020/10/17時点)</span></p><div style="margin:10px;"><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5b4f40.06b0df07.1d5b4f41.25b1e264/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fioplaza%2F1000-01698591-00000001%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><img src="https://static.affiliate.rakuten.co.jp/makelink/rl.svg" style="float:left;max-height:27px;width:auto;margin-top:0"></a><a href="https://hb.afl.rakuten.co.jp/ichiba/1d5b4f40.06b0df07.1d5b4f41.25b1e264/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fioplaza%2F1000-01698591-00000001%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  ><div style="float:right;width:41%;height:27px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:500;line-height:27px;margin-left:1px;padding: 0 12px;border-radius:16px;cursor:pointer;text-align:center;">楽天で購入</div></a></div></td></tr></table></div><br><p style="color:#000000;font-size:12px;line-height:1.4em;margin:5px;word-wrap:break-word"></p></td></tr></table>

# 本記事の構成について

それなりにステップを踏んで進めていく必要があるので、記事をいくつかに分けてまとめていきます。  
まっさらな状態からスタートしますのでご安心ください。

1. [必要なものと環境](/homeassistant_1)
2. [Raspberry Pi OS のセットアップ](/homeassistant_2)
3. [Home Assistant のインストール](/homeassistant_3)
4. [Addon のインストール](/homeassistant_4)
