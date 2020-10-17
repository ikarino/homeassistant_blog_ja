---
title: Home Assistantを使えるようにするまで その3
date: "2020-10-17T02:00:00.00Z"
description: "Raspberry Pi OS のインストールとセットアップ方法について"
categories: [Home Assistant]
comments: true
image:
  feature: https://images.unsplash.com/photo-1440635592348-167b1b30296f?crop=entropy&dpr=2&fit=crop&fm=jpg&h=475&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1250
  credit: thomas shellberg
  creditlink: https://unsplash.com/photos/Ki0dpxd3LGc
---

以下のステップで Home Assistant を使えるようにしていきます。

1. [Home Assistant インストールに必要なものと環境について](/homeassistant_1)
2. **[Raspberry Pi OS のインストールとセットアップについて(本記事)](/homeassistant_2)**
3. [Home Assistant のインストール](/homeassistant_3)
4. [Addon のインストール](/homeassistant_4)

# OS のクリーンインストール

## microSD カードへの OS 書き込み

iMac に SD カードを差し込んでインストールしました。
前は OS のイメージを落として来て、書き込みソフトでインストールした覚えがありますが、今回は推奨されている`Raspberry Pi Imager`を使用しました。

デスクトップ用途はないので OS は`Raspbian`の`Lite`の方を選択しました。

[https://www.raspberrypi.org/downloads/](https://www.raspberrypi.org/downloads/)

## ヘッドレスインストールのための準備

初回起動時に自動的に Wifi に接続させ、iMac から ssh 接続できるように、いくつか準備しました。

`SSID`と`psk`は接続する Wifi の SSID とパスワードです。SSID は Mac のネットワーク設定で表示されているものと一言一句同じにしました。

```bash
touch /Volumes/boot/ssh
echo 'country=JP
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
    ssid="SSID"
    psk="password"
}' > /Volumes/boot/wpa_supplicant.conf
```

# Raspberry Pi の初期設定

## ssh で接続

Mac から ssh で接続します。  
Mac ではデフォルトで Bonjour が有効です。IP アドレスを指定せず、`raspberrypi.local`にアクセスします。  
ユーザ名はデフォルトの`pi`、パスワードは`raspberry`です。

```
ssh pi@raspberypi.local
```

以下は ssh 接続した Raspberry Pi 上の作業です。

## ファームウェアのアップデート

```
sudo rpi-update
```

## `raspi-config`

以下で起動します。

```
sudo raspi-config
```

さしあたり以下を設定しました。

- `8 Update`: `raspi-config`本体をアップデート
- `4 Localisation Options` => `Change Locale` => `ja_JP.UTF-8`: 日本語化
- `7 Advanced Options` => `A1 Expand Filesystem`: SD カードの記憶領域全体を OS で使用可能に。

## パッケージのアップデート

いつもの。

```bash
sudo apt-get update　
sudo apt-get upgrade
sudo apt-get dist-upgrade
sudo apt-get clean
```

## スワップの無効化

SD カードの寿命を伸ばすための工夫です。

```bash
sudo swapoff --all
sudo apt-get purge -y --auto-remove dphys-swapfile
sudo rm -fr /var/swap
```

## Wifi の IP アドレスを固定

`/etc/dhcpcd.conf`に追記します。  
ヘッドレスなのでここでミスると接続できなくなり、やり直しです。慎重に。

```bash:dhcpcd.conf
interface wlan0
static ip_address=192.168.0.230/24  # 指定する固定IPアドレス
static routers=192.168.0.1          # ルータのアドレス
static domain_name_servers=8.8.8.8  # DNSサーバ
```

## root パスワードの変更

```bash
sudo passwd root
```

## ユーザの追加

新しいユーザを追加します。  
新しいユーザで ssh 接続可能なことを確認した上で、デフォルトの`pi`アカウントは消してしまいます。

```bash
$ groups pi
pi : pi adm dialout cdrom sudo audio video plugdev games users input netdev spi i2c gpio
$ sudo useradd testuser
$ sudo usermod -G adm,dialout,cdrom,sudo,audio,video,plugdev,games,users,input,netdev,spi,i2c,gpio testuser # pi以外のグループを引継
# ここで新しいアカウントでログインし直し、接続できることを確認
$ sudo userdel pi
```

# HomeAssistant のインストール

## Docker のインストール

```
# sudo su
curl -sSL https://get.docker.com | sh
```

## 新しいユーザを docker グループに追加

```
usermod -aG docker testuser
```

##

```bash
mkdir config
sudo docker run -d --name="home-assistant" -v ./config:/config -v /etc/localtime:/etc/localtime:ro --net=host homeassistant/home-assistant:stable
```

##

```
sudo apt-get -y install network-manager apparmor apparmor-utils apparmor-profiles jq
```
