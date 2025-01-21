document.addEventListener('DOMContentLoaded', async function() {
    // 다크모드 적용
    document.body.classList.add('dark-mode');
    
    // 스크롤 관련 동작 초기화
    const navbar = document.querySelector('.ftco-navbar-light');
    if (navbar) {
        // 초기 상태 설정
        navbar.style.display = 'block';
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.background = '#242424';
        navbar.classList.add('scrolled');
        
        // 기존 스크롤 이벤트 리스너 제거 및 새로운 설정 적용
        window.addEventListener('scroll', function() {
            navbar.style.display = 'block';
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.classList.add('scrolled');
        });
    }

    // 카테고리별 이모지 매핑
    const categoryEmojis = {
        'APPLICATION': '🔐',
        'CLOUD': '☁️',
        'DATABASE': '💾',
        'HACKING': '🔓',
        '침해사고분석대응': '🚨',
        'NETWORK': '🌐',
        'SERVER': '🏗️',
        'SYSTEM': '⚙️'
    };

    // 카테고리별 포스트 로드 함수
    async function loadCategoryPosts(category) {
        try {
            const response = await fetch(`posts/${category}/index.json`);
            if (!response.ok) {
                console.error(`Error loading ${category} posts:`, response.statusText);
                return [];
            }
            const data = await response.json();
            return data.posts || [];
        } catch (error) {
            console.error(`Error loading ${category} posts:`, error);
            return [];
        }
    }

    // 마크다운 파일 로드 및 변환 함수
    async function loadMarkdownPost(category, filename) {
        try {
            // 경로에서 'posts/' 부분을 제거 (이미 URL에 포함되어 있기 때문)
            const response = await fetch(`posts/${category}/${filename}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            return marked.parse(markdown);
        } catch (error) {
            console.error('Error loading markdown:', error);
            return '<p>포스트를 불러올 수 없습니다.</p>';
        }
    }

    // 목차 생성 함수
    function generateTOC(content) {
        const tocList = document.getElementById('toc-list');
        const postContent = document.getElementById('post-content');
        tocList.innerHTML = '';
        
        // 컨텐츠를 실제 DOM에 적용
        postContent.innerHTML = content;
        
        // 실제 DOM에서 헤더 요소들을 찾음
        const headers = postContent.querySelectorAll('h2, h3');
        const headerPositions = [];
        
        headers.forEach((header, index) => {

            const headerId = `section-${index}`;
            header.id = headerId;
            
            const li = document.createElement('li');
            li.className = 'nav-item';
            const level = parseInt(header.tagName.charAt(1));
            li.style.paddingLeft = `${(level - 1) * 15 - 15}px`;
            
            const link = document.createElement('a');
            link.className = 'nav-link';
            link.href = `#${headerId}`;
            link.textContent = header.textContent;
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(headerId);
                if (target) {
                    const offset = target.offsetTop - 100;
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                    
                    // 클릭한 링크 활성화
                    document.querySelectorAll('#toc-list .nav-link').forEach(l => {
                        l.classList.remove('active');
                    });
                    link.classList.add('active');
                }
            });
            
            li.appendChild(link);
            tocList.appendChild(li);
            
            // 헤더 위치 저장
            headerPositions.push({
                id: headerId,
                top: header.offsetTop
            });
        });

        // 스크롤 이벤트 핸들러
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;
            let activeSection = null;
            
            // 현재 스크롤 위치에 해당하는 섹션 찾기
            for (let i = 0; i < headerPositions.length; i++) {
                if (scrollPosition >= headerPositions[i].top) {
                    activeSection = headerPositions[i].id;
                }
            }
            
            // 목차 항목 활성화 상태 업데이트
            if (activeSection) {
                document.querySelectorAll('#toc-list .nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeSection}`) {
                        link.classList.add('active');
                    }
                });
            }
        };

        // 스크롤 이벤트 리스너 등록
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll);
        
        // 초기 활성화 상태 설정
        setTimeout(handleScroll, 200);
    }

    // URL 파라미터 파싱 함수 수정
    function getPostFromUrl() {
        // URL에서 ? 이후의 문자열을 가져옴
        const query = window.location.search.substring(1);
        return query ? decodeURIComponent(query) : null;
    }

    // createPostList 함수 수정
    async function createPostList() {
        const postList = document.getElementById('post-items');
        const categories = [
            'APPLICATION',
            'CLOUD',
            'DATABASE',
            'HACKING',
            '침해사고분석대응',
            'NETWORK',
            'SERVER',
            'SYSTEM'
        ];
        
        for (const category of categories) {
            try {
                const response = await fetch(`posts/${category.toLowerCase()}/index.json`);
                if (!response.ok) continue;
                
                const data = await response.json();
                const categoryData = data.categories[0];
                
                const groupDiv = document.createElement('div');
                groupDiv.className = 'category-group';
                
                // 메인 카테고리 생성
                const categoryTitle = document.createElement('div');
                categoryTitle.className = 'category-btn';
                categoryTitle.innerHTML = `${categoryEmojis[category]} ${category}`;
                
                // 메인 카테고리의 컨텐츠 컨테이너
                const mainContainer = document.createElement('div');
                mainContainer.className = 'posts-container show';
                
                // 직접적인 포스트들 추가
                if (categoryData.posts) {
                    categoryData.posts.forEach(post => {
                        const postItem = document.createElement('div');
                        postItem.className = 'post-item';
                        postItem.textContent = post.title;
                        postItem.addEventListener('click', async () => {
                            const content = await loadMarkdownPost(category.toLowerCase(), post.filename);
                            document.getElementById('post-content').innerHTML = content;
                            generateTOC(content);
                            
                            document.querySelectorAll('.post-item, .sub-post-item').forEach(p => {
                                p.classList.remove('active');
                            });
                            postItem.classList.add('active');
                            
                            const newUrl = `${window.location.pathname}?${encodeURIComponent(post.title)}`;
                            window.history.pushState({}, '', newUrl);
                        });
                        mainContainer.appendChild(postItem);
                    });
                }
                
                // 하위 카테고리 추가
                if (categoryData.subcategories) {
                    categoryData.subcategories.forEach(subcategory => {
                        const subCategoryBtn = document.createElement('button');
                        subCategoryBtn.className = 'subcategory-btn';
                        subCategoryBtn.innerHTML = `
                            <span>${subcategory.name}</span>
                            <button class="toggle-btn">
                                <i class="bi bi-chevron-down"></i>
                            </button>
                        `;
                        
                        const subPostsContainer = document.createElement('div');
                        subPostsContainer.className = 'sub-posts-container';
                        
                        // 하위 카테고리의 포스트들
                        if (subcategory['sub-posts']) {
                            subcategory['sub-posts'].forEach(post => {
                                const subPostItem = document.createElement('div');
                                subPostItem.className = 'sub-post-item';
                                subPostItem.textContent = post.title;
                                subPostItem.addEventListener('click', async () => {
                                    const content = await loadMarkdownPost(category.toLowerCase(), post.filename);
                                    document.getElementById('post-content').innerHTML = content;
                                    generateTOC(content);
                                    
                                    document.querySelectorAll('.post-item, .sub-post-item').forEach(p => {
                                        p.classList.remove('active');
                                    });
                                    subPostItem.classList.add('active');
                                    
                                    const newUrl = `${window.location.pathname}?${encodeURIComponent(post.title)}`;
                                    window.history.pushState({}, '', newUrl);
                                });
                                subPostsContainer.appendChild(subPostItem);
                            });
                        }
                        
                        // 하위 카테고리 클릭 이벤트
                        subCategoryBtn.addEventListener('click', async (e) => {
                            if (e.target.closest('.toggle-btn')) {
                                e.stopPropagation();
                                subPostsContainer.classList.toggle('show');
                                e.target.closest('.toggle-btn').classList.toggle('active');
                            } else {
                                // 서브카테고리 클릭 시
                                if (subcategory['sub-posts'] && subcategory['sub-posts'].length > 0) {
                                    // 컨테이너가 닫혀있으면 열기
                                    if (!subPostsContainer.classList.contains('show')) {
                                        subPostsContainer.classList.add('show');
                                        subCategoryBtn.querySelector('.toggle-btn').classList.add('active');
                                    }
                                    
                                    // 첫 번째 포스트 로드
                                    const firstPost = subcategory['sub-posts'][0];
                                    const content = await loadMarkdownPost(category.toLowerCase(), firstPost.filename);
                                    document.getElementById('post-content').innerHTML = content;
                                    generateTOC(content);
                                    
                                    // URL 업데이트
                                    const newUrl = `${window.location.pathname}?${encodeURIComponent(firstPost.title)}`;
                                    window.history.pushState({}, '', newUrl);
                                    
                                    // 첫 번째 포스트 활성화
                                    document.querySelectorAll('.post-item, .sub-post-item').forEach(p => {
                                        p.classList.remove('active');
                                    });
                                    subPostsContainer.querySelector('.sub-post-item').classList.add('active');
                                }
                            }
                        });
                        
                        mainContainer.appendChild(subCategoryBtn);
                        mainContainer.appendChild(subPostsContainer);
                    });
                }
                
                groupDiv.appendChild(categoryTitle);
                groupDiv.appendChild(mainContainer);
                postList.appendChild(groupDiv);
                
            } catch (error) {
                console.error(`Error loading ${category} category:`, error);
            }
        }
    }

    // URL에서 포스트 제목을 가져와서 해당 포스트를 로드하는 함수
    async function loadPostFromUrl() {
        const postTitle = getPostFromUrl();
        if (!postTitle) return;

        // 모든 카테고리를 순회하며 해당 포스트 찾기
        const categories = ['APPLICATION', 'CLOUD', 'DATABASE', 'HACKING', '침해사고분석대응', 'NETWORK', 'SERVER', 'SYSTEM'];
        
        for (const category of categories) {
            try {
                const response = await fetch(`posts/${category.toLowerCase()}/index.json`);
                if (!response.ok) continue;
                
                const data = await response.json();
                const categoryData = data.categories[0];
                
                // 메인 포스트에서 찾기
                const mainPost = categoryData.posts?.find(post => post.title === postTitle);
                if (mainPost) {
                    const content = await loadMarkdownPost(category.toLowerCase(), mainPost.filename);
                    document.getElementById('post-content').innerHTML = content;
                    generateTOC(content);
                    
                    // 해당 포스트 항목 활성화
                    setTimeout(() => {
                        const postItems = document.querySelectorAll('.post-item');
                        postItems.forEach(item => {
                            if (item.textContent === postTitle) {
                                item.classList.add('active');
                            }
                        });
                    }, 100);
                    return;
                }
                
                // 서브카테고리 포스트에서 찾기
                if (categoryData.subcategories) {
                    for (const sub of categoryData.subcategories) {
                        const subPost = sub['sub-posts']?.find(post => post.title === postTitle);
                        if (subPost) {
                            const content = await loadMarkdownPost(category.toLowerCase(), subPost.filename);
                            document.getElementById('post-content').innerHTML = content;
                            generateTOC(content);
                            
                            // 해당 포스트 항목 활성화 및 서브카테고리 열기
                            setTimeout(() => {
                                const subPostItems = document.querySelectorAll('.sub-post-item');
                                subPostItems.forEach(item => {
                                    if (item.textContent === postTitle) {
                                        item.classList.add('active');
                                        item.closest('.sub-posts-container').classList.add('show');
                                        const toggleBtn = item.closest('.sub-posts-container').previousElementSibling.querySelector('.toggle-btn');
                                        if (toggleBtn) toggleBtn.classList.add('active');
                                    }
                                });
                            }, 100);
                            return;
                        }
                    }
                }
            } catch (error) {
                console.error(`Error searching in ${category}:`, error);
            }
        }
    }

    // 페이지 로드 시 URL 확인 및 포스트 로드
    await createPostList();
    await loadPostFromUrl();

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 현재 화면에 보이는 섹션 찾기
        document.querySelectorAll('[id^="section-"]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom) {
                // 해당 섹션의 목차 항목 활성화
                document.querySelectorAll('#toc-list .nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
