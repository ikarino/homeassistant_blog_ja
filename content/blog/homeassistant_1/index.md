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

1. **[Home Assistant インストールに必要なものと環境について(本記事)](/homeassistant_1)**
2. [Raspberry Pi OS のインストールとセットアップについて](/homeassistant_2)
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

Home Assistant 公式では Raspberry Pi 4 のメモリ 2GB 以上を推奨しています。

## micro SD カード

## AC 電源アダプタ

## 放熱ケース
