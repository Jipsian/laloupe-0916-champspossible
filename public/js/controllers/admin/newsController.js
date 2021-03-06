function newsController(newsService, $timeout) {

    this.newsService = newsService;

    this.load = () => {
        this.newsService.getAll().then((res) => {
            this.newss = res.data;
            this.newss.map((n)=> {
              n.date = new Date(n.date);
              return n;
            })
        });
    };

    this.load();

    this.create = () => {
        this.newsService.create({}).then(() => {
            this.load();
        });
    };

    this.update = (news, index) => {
        var uploadfiles = document.querySelector('#uploadImage-' + index);
        var files = uploadfiles.files;
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var url = '/api/picture';
                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                xhr.open("POST", url, true);
                xhr.onload = () => {
                    var urlImage = '/uploads/img_' + document.getElementById('uploadImage-' + index).value.split(/(\|\/)/g).pop().replace('C:\\fakepath\\', '');

                    news.image = urlImage;
                    this.newsService.update(news._id, news).then(() => {
                        $timeout(() => {
                            this.load();
                        }, 1000);

                    });
                };
                fd.append("upload_file", files[i]);
                xhr.send(fd);
            }
        } else {
            this.newsService.update(news._id, news).then(() => {
                this.load();
            });
        }
    };

    this.delete = (news) => {
        this.newsService.delete(news._id).then(() => {
            this.load();
        });
    };
}
