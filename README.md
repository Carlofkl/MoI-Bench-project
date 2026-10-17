# MoI-Bench project page

纯静态学术项目主页。无需 Node.js、npm 或构建步骤，可直接发布到 GitHub Pages。

## 本地预览

在此目录运行：

```sh
python3 -m http.server 8000
```

浏览器打开 http://localhost:8000 。也可以直接打开 `index.html`；复制 BibTeX 在 HTTPS 或 localhost 环境下效果更好。

## 上线前填写

编辑 `site-config.js`：

- `github`：论文代码仓库完整 HTTPS 链接。
- `huggingface`：数据集、模型或 Space 的完整 HTTPS 链接。
- `bibtex`：最终 BibTeX。当前为空，复制按钮禁用；填入后自动启用。

以上链接为空时显示 Coming soon，不会跳到假的仓库。作者与机构信息可在 `index.html` 中修改。按作者最新要求：Kailai Feng、Chengkun Cai 和 Jagmohan Chauhan 为 UCL，Yuxiang Wei 为香港理工大学，其余作者均为 ByteDance。

论文按钮指向 `assets/paper/MoI-Bench.pdf`，可用最终公开版替换它。所有路径都是相对路径，支持 `https://<owner>.github.io/<repository>/` 子路径部署。

## GitHub Pages 发布（独立项目主页仓库）

1. 将 **本目录内容** 上传至新仓库根目录，包括 `.github` 和 `.nojekyll`，而不是再套一层 `MoI-Bench` 文件夹。
2. 默认分支为 `main`。如果使用其他分支，修改 `.github/workflows/pages.yml` 的分支设置。
3. 在仓库 Settings → Pages → Build and deployment 中选择 **GitHub Actions**。
4. 推送到 `main` 后运行 `Deploy MoI-Bench to GitHub Pages` 工作流，也可在 Actions 中手动运行。
5. 工作流成功后访问 Pages 显示的网址。

也可删除工作流，使用 Pages 的 Deploy from a branch → main → / (root)。

如果要把它保留在已有仓库的 `project page/MoI-Bench-project/` 下：GitHub 工作流必须放在**仓库根目录** `.github/workflows/`，并将 `upload-pages-artifact` 的 `path` 改为 `project page/MoI-Bench-project`。不要直接把当前嵌套工作流当作已有仓库的工作流。

## 内容与交互

- 标题、作者、资源入口和论文概览。
- 5 种视图切换：完整对比、生成、添加、调整、移除。
- 能力雷达图、Operation × Target 热图、Quality–Deployability 图。
- 用户调研与数据分布图。
- 点击图片放大；放大窗口可滚动，Esc 关闭，也可以打开原图。
- BibTeX 展示与复制（填写配置后启用）。
- 移动端布局、键盘可用的标签页、对话框及减少动画偏好支持。

## 文件

- `index.html`：内容和结构。
- `styles.css`：配色、排版、响应式布局。
- `app.js`：图片放大、样例切换、资源链接和引用复制。
- `site-config.js`：未来资源链接和 BibTeX。
- `assets/images/`：WebP 论文图。
- `assets/paper/MoI-Bench.pdf`：用户提供的论文。
- `ASSETS.md`：图片出处。

页面以 VBench 的学术项目页组织方式和 DreamLite 的配色为参考，HTML/CSS/JS 为本项目编写，未复制其源代码、图片或视频。所有字体使用系统字体，不依赖外部 CDN。

GitHub Pages 工作流依据：[官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

补充材料样例：`examples.js` 定义各标签页的图片列表，`assets/images/supplement/` 保存从补充材料拆出的 64 个样例（Generation、Local editing、Global editing、Understanding editing、Reference editing）。
