/**
 * Minified by jsDelivr using Terser v5.19.2.
 * Original file: /npm/d3-org-chart@3.0.1/build/d3-org-chart.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? e(exports, require("d3-selection"), require("d3-array"), require("d3-hierarchy"), require("d3-zoom"), require("d3-flextree"), require("d3-shape")) : "function" == typeof define && define.amd ? define(["exports", "d3-selection", "d3-array", "d3-hierarchy", "d3-zoom", "d3-flextree", "d3-shape"], e) : e(t.d3 = t.d3 || {}, t.d3, t.d3, t.d3, t.d3, t.d3, t.d3) }(this, (function (t, e, n, a, i, o, r) {
    "use strict";
    const d = {
        selection: e.selection,
        select: e.select,
        max: n.max,
        min: n.min,
        sum: n.sum,
        cumsum: n.cumsum,
        tree: a.tree,
        stratify: a.stratify,
        zoom: i.zoom,
        zoomIdentity: i.zoomIdentity,
        linkHorizontal: r.linkHorizontal,
        flextree: o.flextree
    };
    t.OrgChart = class {
        constructor() {
            const t = {
                id: `ID${Math.floor(1e6 * Math.random())}`,
                firstDraw: !0,
                ctx: document.createElement("canvas").getContext("2d"),
                initialExpandLevel: 1,
                nodeDefaultBackground: "none",
                lastTransform: { x: 0, y: 0, k: 1 },
                allowedNodesCount: {},
                zoomBehavior: null,
                generateRoot: null,
                svgWidth: window.innerWidth,
                svgHeight: window.innerHeight,
                container: "body",
                data: null,
                connections: [],
                defaultFont: "Helvetica",
                nodeId: t => t.nodeId || t.id,
                parentNodeId: t => t.parentNodeId || t.parentId,
                rootMargin: 40,
                nodeWidth: t => 370,
                nodeHeight: t => 155,
                neighbourMargin: (t, e) => 20,
                siblingsMargin: t => 20,
                childrenMargin: t => 50,
                compactMarginPair: t => 30,
                compactMarginBetween: t => 35,
                nodeButtonWidth: t => 382,
                nodeButtonHeight: t => 130,
                nodeButtonX: t => -190,
                nodeButtonY: t => -126, 
                linkYOffset: 30,
                pagingStep: t => 5,
                minPagingVisibleNodes: t => 2e3,
                scaleExtent: [.001, 20],
                duration: 400,
                imageName: "Chart",
                setActiveNodeCentered: !0,
                layout: "top", compact: !0,
                createZoom: t => d.zoom(),
                onZoomStart: t => { },
                onZoom: t => { },
                onZoomEnd: t => { },
                onNodeClick: t => t,
                onExpandOrCollapse: t => t,
                nodeContent: t => `
                <div style="padding:5px;font-size:10px;">Sample Node(id=${t.id}), override using 
                    <br/> \n            
                    <code>chart.nodeContent({data}=>{ 
                        <br/>\n             
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        return '' // Custom HTML 
                        <br/>\n             
                    })
                    </code>\n             
                    <br/> \n             Or check different <a href="https://github.com/bumbeishvili/org-chart#jump-to-examples" target="_blank">layout examples</a>\n             
                </div>
                `,
                buttonContent: ({ node: t, state: e }) => `
                <div style="position: absolute;border:1px solid #E4E2E9;border-radius:3px;padding:4px;font-size:9px;bottom: -8px;right:178px;margin:auto auto;background-color:white"> 
                    ${{
                        left: e => e ? `
                        <div style="display:flex;">
                            <span style="align-items:center;display:flex;">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                      
                                    <path d="M14.283 3.50094L6.51 11.4749C6.37348 11.615 6.29707 11.8029 6.29707 11.9984C6.29707 12.194 6.37348 12.3819 6.51 12.5219L14.283 20.4989C14.3466 20.5643 14.4226 20.6162 14.5066 20.6516C14.5906 20.6871 14.6808 20.7053 14.772 20.7053C14.8632 20.7053 14.9534 20.6871 15.0374 20.6516C15.1214 20.6162 15.1974 20.5643 15.261 20.4989C15.3918 20.365 15.4651 20.1852 15.4651 19.9979C15.4651 19.8107 15.3918 19.6309 15.261 19.4969L7.9515 11.9984L15.261 4.50144C15.3914 4.36756 15.4643 4.18807 15.4643 4.00119C15.4643 3.81431 15.3914 3.63482 15.261 3.50094C15.1974 3.43563 15.1214 3.38371 15.0374 3.34827C14.9534 3.31282 14.8632 3.29456 14.772 3.29456C14.6808 3.29456 14.5906 3.31282 14.5066 3.34827C14.4226 3.38371 14.3466 3.43563 14.283 3.50094V3.50094Z" fill="#716E7B" stroke="#716E7B"/>\n                      
                                </svg>
                            </span>
                            <span style="color:#716E7B">${t.data._directSubordinatesPaging} </span>
                        </div>
                        `: `
                        <div style="display:flex;">
                            <span style="align-items:center;display:flex;">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                          
                                    <path d="M7.989 3.49944C7.85817 3.63339 7.78492 3.8132 7.78492 4.00044C7.78492 4.18768 7.85817 4.36749 7.989 4.50144L15.2985 11.9999L7.989 19.4969C7.85817 19.6309 7.78492 19.8107 7.78492 19.9979C7.78492 20.1852 7.85817 20.365 7.989 20.4989C8.05259 20.5643 8.12863 20.6162 8.21261 20.6516C8.2966 20.6871 8.38684 20.7053 8.478 20.7053C8.56916 20.7053 8.6594 20.6871 8.74338 20.6516C8.82737 20.6162 8.90341 20.5643 8.967 20.4989L16.74 12.5234C16.8765 12.3834 16.9529 12.1955 16.9529 11.9999C16.9529 11.8044 16.8765 11.6165 16.74 11.4764L8.967 3.50094C8.90341 3.43563 8.82737 3.38371 8.74338 3.34827C8.6594 3.31282 8.56916 3.29456 8.478 3.29456C8.38684 3.29456 8.2966 3.31282 8.21261 3.34827C8.12863 3.38371 8.05259 3.43563 7.989 3.50094V3.49944Z" fill="#716E7B" stroke="#716E7B"/>\n                          
                                </svg>
                            </span>
                            <span style="color:#716E7B">${t.data._directSubordinatesPaging} </span>
                        </div>
                        `, 
                        bottom: e => e ? `
                        <div style="display:flex;">
                            <span style="align-items:center;display:flex;">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                       
                                    <path d="M19.497 7.98903L12 15.297L4.503 7.98903C4.36905 7.85819 4.18924 7.78495 4.002 7.78495C3.81476 7.78495 3.63495 7.85819 3.501 7.98903C3.43614 8.05257 3.38462 8.12842 3.34944 8.21213C3.31427 8.29584 3.29615 8.38573 3.29615 8.47653C3.29615 8.56733 3.31427 8.65721 3.34944 8.74092C3.38462 8.82463 3.43614 8.90048 3.501 8.96403L11.4765 16.74C11.6166 16.8765 11.8044 16.953 12 16.953C12.1956 16.953 12.3834 16.8765 12.5235 16.74L20.499 8.96553C20.5643 8.90193 20.6162 8.8259 20.6517 8.74191C20.6871 8.65792 20.7054 8.56769 20.7054 8.47653C20.7054 8.38537 20.6871 8.29513 20.6517 8.21114C20.6162 8.12715 20.5643 8.05112 20.499 7.98753C20.3651 7.85669 20.1852 7.78345 19.998 7.78345C19.8108 7.78345 19.6309 7.85669 19.497 7.98753V7.98903Z" fill="#716E7B" stroke="#716E7B"/>\n                       
                                </svg>
                            </span>
                            <span style="margin-left:1px;color:#716E7B;font-size: 8px" >${t.data._directSubordinatesPaging} </span>
                        </div>\n                       
                        `: `
                        <div style="display:flex;">
                            <span style="align-items:center;display:flex;">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                       
                                    <path d="M11.457 8.07005L3.49199 16.4296C3.35903 16.569 3.28485 16.7543 3.28485 16.9471C3.28485 17.1398 3.35903 17.3251 3.49199 17.4646L3.50099 17.4736C3.56545 17.5414 3.64304 17.5954 3.72904 17.6324C3.81504 17.6693 3.90765 17.6883 4.00124 17.6883C4.09483 17.6883 4.18745 17.6693 4.27344 17.6324C4.35944 17.5954 4.43703 17.5414 4.50149 17.4736L12.0015 9.60155L19.4985 17.4736C19.563 17.5414 19.6405 17.5954 19.7265 17.6324C19.8125 17.6693 19.9052 17.6883 19.9987 17.6883C20.0923 17.6883 20.1849 17.6693 20.2709 17.6324C20.3569 17.5954 20.4345 17.5414 20.499 17.4736L20.508 17.4646C20.641 17.3251 20.7151 17.1398 20.7151 16.9471C20.7151 16.7543 20.641 16.569 20.508 16.4296L12.543 8.07005C12.4729 7.99653 12.3887 7.93801 12.2954 7.89801C12.202 7.85802 12.1015 7.8374 12 7.8374C11.8984 7.8374 11.798 7.85802 11.7046 7.89801C11.6113 7.93801 11.527 7.99653 11.457 8.07005Z" fill="#716E7B" stroke="#716E7B"/>\n                       
                                </svg>
                            </span>
                            <span style="margin-left:1px;color:#716E7B; font-size: 8px>${t.data._directSubordinatesPaging} </span>
                        </div>\n                    
                        `, right: e => e ? `
                        <div style="display:flex;">
                            <span style="align-items:center;display:flex;">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                       
                                    <path d="M7.989 3.49944C7.85817 3.63339 7.78492 3.8132 7.78492 4.00044C7.78492 4.18768 7.85817 4.36749 7.989 4.50144L15.2985 11.9999L7.989 19.4969C7.85817 19.6309 7.78492 19.8107 7.78492 19.9979C7.78492 20.1852 7.85817 20.365 7.989 20.4989C8.05259 20.5643 8.12863 20.6162 8.21261 20.6516C8.2966 20.6871 8.38684 20.7053 8.478 20.7053C8.56916 20.7053 8.6594 20.6871 8.74338 20.6516C8.82737 20.6162 8.90341 20.5643 8.967 20.4989L16.74 12.5234C16.8765 12.3834 16.9529 12.1955 16.9529 11.9999C16.9529 11.8044 16.8765 11.6165 16.74 11.4764L8.967 3.50094C8.90341 3.43563 8.82737 3.38371 8.74338 3.34827C8.6594 3.31282 8.56916 3.29456 8.478 3.29456C8.38684 3.29456 8.2966 3.31282 8.21261 3.34827C8.12863 3.38371 8.05259 3.43563 7.989 3.50094V3.49944Z" fill="#716E7B" stroke="#716E7B"/>\n                       
                                </svg>
                            </span>
                            <span style="color:#716E7B">${t.data._directSubordinatesPaging} </span>
                            </div>
                            `: `
                        <div style="display:flex;">
                            <span style="align-items:center;display:flex;">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                       
                                    <path d="M14.283 3.50094L6.51 11.4749C6.37348 11.615 6.29707 11.8029 6.29707 11.9984C6.29707 12.194 6.37348 12.3819 6.51 12.5219L14.283 20.4989C14.3466 20.5643 14.4226 20.6162 14.5066 20.6516C14.5906 20.6871 14.6808 20.7053 14.772 20.7053C14.8632 20.7053 14.9534 20.6871 15.0374 20.6516C15.1214 20.6162 15.1974 20.5643 15.261 20.4989C15.3918 20.365 15.4651 20.1852 15.4651 19.9979C15.4651 19.8107 15.3918 19.6309 15.261 19.4969L7.9515 11.9984L15.261 4.50144C15.3914 4.36756 15.4643 4.18807 15.4643 4.00119C15.4643 3.81431 15.3914 3.63482 15.261 3.50094C15.1974 3.43563 15.1214 3.38371 15.0374 3.34827C14.9534 3.31282 14.8632 3.29456 14.772 3.29456C14.6808 3.29456 14.5906 3.31282 14.5066 3.34827C14.4226 3.38371 14.3466 3.43563 14.283 3.50094V3.50094Z" fill="#716E7B" stroke="#716E7B"/>\n                       
                                </svg>
                            </span>
                        <span style="color:#716E7B">${t.data._directSubordinatesPaging} </span>
                        </div>
                        `, top: e => e ? `
                        <div style="display:flex;">
                            <span style="align-items:center;display:flex;">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                        
                                    <path d="M11.457 8.07005L3.49199 16.4296C3.35903 16.569 3.28485 16.7543 3.28485 16.9471C3.28485 17.1398 3.35903 17.3251 3.49199 17.4646L3.50099 17.4736C3.56545 17.5414 3.64304 17.5954 3.72904 17.6324C3.81504 17.6693 3.90765 17.6883 4.00124 17.6883C4.09483 17.6883 4.18745 17.6693 4.27344 17.6324C4.35944 17.5954 4.43703 17.5414 4.50149 17.4736L12.0015 9.60155L19.4985 17.4736C19.563 17.5414 19.6405 17.5954 19.7265 17.6324C19.8125 17.6693 19.9052 17.6883 19.9987 17.6883C20.0923 17.6883 20.1849 17.6693 20.2709 17.6324C20.3569 17.5954 20.4345 17.5414 20.499 17.4736L20.508 17.4646C20.641 17.3251 20.7151 17.1398 20.7151 16.9471C20.7151 16.7543 20.641 16.569 20.508 16.4296L12.543 8.07005C12.4729 7.99653 12.3887 7.93801 12.2954 7.89801C12.202 7.85802 12.1015 7.8374 12 7.8374C11.8984 7.8374 11.798 7.85802 11.7046 7.89801C11.6113 7.93801 11.527 7.99653 11.457 8.07005Z" fill="#716E7B" stroke="#716E7B"/>\n                        
                                </svg>
                            </span>
                            <span style="margin-left:1px;color:#716E7B; font-size: 12px">${t.data._directSubordinatesPaging} </span>
                        </div>\n                        
                        `: `
                        <div style="display:flex;">
                            <span style="align-items:center;display:flex;">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                        
                                    <path d="M19.497 7.98903L12 15.297L4.503 7.98903C4.36905 7.85819 4.18924 7.78495 4.002 7.78495C3.81476 7.78495 3.63495 7.85819 3.501 7.98903C3.43614 8.05257 3.38462 8.12842 3.34944 8.21213C3.31427 8.29584 3.29615 8.38573 3.29615 8.47653C3.29615 8.56733 3.31427 8.65721 3.34944 8.74092C3.38462 8.82463 3.43614 8.90048 3.501 8.96403L11.4765 16.74C11.6166 16.8765 11.8044 16.953 12 16.953C12.1956 16.953 12.3834 16.8765 12.5235 16.74L20.499 8.96553C20.5643 8.90193 20.6162 8.8259 20.6517 8.74191C20.6871 8.65792 20.7054 8.56769 20.7054 8.47653C20.7054 8.38537 20.6871 8.29513 20.6517 8.21114C20.6162 8.12715 20.5643 8.05112 20.499 7.98753C20.3651 7.85669 20.1852 7.78345 19.998 7.78345C19.8108 7.78345 19.6309 7.85669 19.497 7.98753V7.98903Z" fill="#716E7B" stroke="#716E7B"/>\n                        
                                </svg>
                            </span>
                            <span style="margin-left:1px;color:#716E7B; font-size: 12px">${t.data._directSubordinatesPaging} </span>
                        </div>\n                    
                        `}[e.layout](t.children)
                    }  
                </div>
                `, 
                pagingButton: (t, e, n, a) => {
                    const i = a.pagingStep(t.parent), o = t.parent.data._pagingStep, r = t.parent.data._directSubordinatesPaging - o; return `\n                   
                    <div style="margin-top:90px;">\n                      
                        <div style="display:flex;width:170px;border-radius:20px;padding:5px 15px; padding-bottom:4px;;background-color:#E5E9F2">\n                      
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                      
                                    <path d="M5.59 7.41L10.18 12L5.59 16.59L7 18L13 12L7 6L5.59 7.41ZM16 6H18V18H16V6Z" fill="#716E7B" stroke="#716E7B"/>\n                      
                                </svg>\n                      
                            </div>
                            <div style="line-height:2"> Show next ${Math.min(r, i)}  nodes </div>
                        </div>\n                   
                    </div>\n                
                `},
                nodeUpdate: function (t, e, n) {
                    d.select(this)
                        .select(".node-rect")
                        .attr("stroke", (t => t.data._highlighted || t.data._upToTheRootHighlighted ? "#E27396" : "none"))
                        .attr("stroke-width", t.data._highlighted || t.data._upToTheRootHighlighted ? 10 : 1)
                },
                linkUpdate: function (t, e, n) {
                    d.select(this)
                        .attr("stroke", (t => t.data._upToTheRootHighlighted ? "#E27396" : "#E4E2E9"))
                        .attr("stroke-width", (t => t.data._upToTheRootHighlighted ? 5 : 1)),
                        t.data._upToTheRootHighlighted && d.select(this).raise()
                },
                hdiagonal: function (t, e, n) {
                    const a = t.x, i = t.y, o = e.x, r = e.y; let d = n && null != n.x ? n.x : a, s = n && null != n.y ? n.y : i, l = o - a < 0 ? -1 : 1, c = r - i < 0 ? -1 : 1, h = Math.abs(o - a) / 2 < 35 ? Math.abs(o - a) / 2 : 35; h = Math.abs(r - i) / 2 < h ? Math.abs(r - i) / 2 : h; Math.abs(r - i);
                    let g = Math.abs(o - a) / 2 - h;
                    return `\n                          
                    M ${d} ${s}\n                          
                    L ${d} ${i}\n                          
                    L ${a} ${i}\n                          
                    L ${a + g * l} ${i}\n                          
                    C ${a + g * l + h * l} ${i} \n                            
                    ${a + g * l + h * l} ${i} \n                            
                    ${a + g * l + h * l} ${i + h * c}\n                          
                    L ${a + g * l + h * l} ${r - h * c} \n                          
                    C ${a + g * l + h * l}  ${r} \n                            
                    ${a + g * l + h * l}  ${r} \n                            
                    ${o - g * l}  ${r}\n                          
                    L ${o} ${r}\n               
                `},
                diagonal: function (t, e, n, a = { sy: 0 }) {
                    const i = t.x; let o = t.y;
                    const r = e.x, d = e.y;
                    let s = n && null != n.x ? n.x : i,
                        l = n && null != n.y ? n.y : o,
                        c = r - i < 0 ? -1 : 1,
                        h = d - o < 0 ? -1 : 1;
                    o += a.sy;
                    let g = Math.abs(r - i) / 2 < 35 ? Math.abs(r - i) / 2 : 35;
                    g = Math.abs(d - o) / 2 < g ? Math.abs(d - o) / 2 : g;
                    let p = Math.abs(d - o) / 2 - g;
                    return `\n                          
                    M ${s} ${l}\n                          
                    L ${i} ${l}\n                          
                    L ${i} ${o}\n                          
                    L ${i} ${o + p * h}\n                          
                    C ${i} ${o + p * h + g * h} ${i} ${o + p * h + g * h} ${i + g * c} ${o + p * h + g * h}\n                          
                    L ${i + (Math.abs(r - i) - 2 * g) * c + g * c} ${o + p * h + g * h}\n                          
                    C ${r} ${o + p * h + g * h} ${r}  ${o + p * h + g * h} ${r} ${d - p * h}\n                          
                    L ${r} ${d}\n               
                `},
                defs: function (t, e) {
                    return `
                    <defs>\n                    
                    ${e.map((e => {
                        const n = this.getTextWidth(e.label, { ctx: t.ctx, fontSize: 2, defaultFont: t.defaultFont });
                        return `\n                       
                        <marker id="${e.from + "_" + e.to}" refX="${e._source.x < e._target.x ? -7 : 7}" refY="5" markerWidth="500"  markerHeight="500"  orient="${e._source.x < e._target.x ? "auto" : "auto-start-reverse"}" >\n                       
                            <rect rx=0.5 width=${e.label ? n + 3 : 0} height=3 y=1  fill="#E27396"></rect>\n                       
                                <text font-size="2px" x=1 fill="white" y=3>${e.label || ""}</text>\n                       
                        </marker>\n\n                       
                        <marker id="arrow-${e.from + "_" + e.to}"  markerWidth="500"  markerHeight="500"  refY="2"  refX="1" orient="${e._source.x < e._target.x ? "auto" : "auto-start-reverse"}" >\n                       
                            <path transform="translate(0)" d='M0,0 V4 L2,2 Z' fill='#E27396' />\n                       
                        </marker>\n                    
                    `})).join("")}\n                    
                    </defs>\n                    
                `},
                connectionsUpdate: function (t, e, n) {
                    d.select(this).attr("stroke", (t => "#E27396"))
                        .attr("stroke-linecap", "round")
                        .attr("stroke-width", (t => "5"))
                        .attr("pointer-events", "none")
                        .attr("marker-start", (t => `url(#${t.from + "_" + t.to})`))
                        .attr("marker-end", (t => `url(#arrow-${t.from + "_" + t.to})`))
                },
                linkGroupArc: d.linkHorizontal().x((t => t.x)).y((t => t.y)),
                layoutBindings: {
                    left: {
                        nodeLeftX: t => 0,
                        nodeRightX: t => t.width,
                        nodeTopY: t => -t.height / 2,
                        nodeBottomY: t => t.height / 2,
                        nodeJoinX: t => t.x + t.width,
                        nodeJoinY: t => t.y - t.height / 2,
                        linkJoinX: t => t.x + t.width,
                        linkJoinY: t => t.y,
                        linkX: t => t.x,
                        linkY: t => t.y,
                        linkCompactXStart: t => t.x + t.width / 2,
                        linkCompactYStart: t => t.y + (t.compactEven ? t.height / 2 : -t.height / 2),
                        compactLinkMidX: (t, e) => t.firstCompactNode.x,
                        compactLinkMidY: (t, e) => t.firstCompactNode.y + t.firstCompactNode.flexCompactDim[0] / 4 + e.compactMarginPair(t) / 4,
                        linkParentX: t => t.parent.x + t.parent.width,
                        linkParentY: t => t.parent.y,
                        buttonX: t => t.width,
                        buttonY: t => t.height / 2,
                        centerTransform: ({ root: t, rootMargin: e, centerY: n, scale: a, centerX: i }) => `translate(${e},${n}) scale(${a})`,
                        compactDimension: {
                            sizeColumn: t => t.height,
                            sizeRow: t => t.width,
                            reverse: t => t.slice().reverse()
                        },
                        nodeFlexSize: ({ height: t, width: e, siblingsMargin: n, childrenMargin: a, state: i, node: o }) => {
                            if (i.compact && o.flexCompactDim) {
                                return [o.flexCompactDim[0], o.flexCompactDim[1]]
                            }
                            return [t + n, e + a]
                        },
                        zoomTransform: ({ centerY: t, scale: e }) => `translate(0,${t}) scale(${e})`,
                        diagonal: this.hdiagonal.bind(this),
                        swap: t => {
                            const e = t.x; t.x = t.y, t.y = e
                        },
                        nodeUpdateTransform: ({ x: t, y: e, width: n, height: a }) => `translate(${t},${e - a / 2})`
                    },
                    top: {
                        nodeLeftX: t => -t.width / 2,
                        nodeRightX: t => t.width / 2,
                        nodeTopY: t => 0,
                        nodeBottomY: t => t.height,
                        nodeJoinX: t => t.x - t.width / 2,
                        nodeJoinY: t => t.y + t.height,
                        linkJoinX: t => t.x,
                        linkJoinY: t => t.y + t.height,
                        linkCompactXStart: t => t.x + (t.compactEven ? t.width / 2 : -t.width / 2),
                        linkCompactYStart: t => t.y + t.height / 2,
                        compactLinkMidX: (t, e) => t.firstCompactNode.x + t.firstCompactNode.flexCompactDim[0] / 4 + e.compactMarginPair(t) / 4,
                        compactLinkMidY: t => t.firstCompactNode.y,
                        compactDimension: {
                            sizeColumn: t => t.width,
                            sizeRow: t => t.height,
                            reverse: t => t
                        },
                        linkX: t => t.x,
                        linkY: t => t.y,
                        linkParentX: t => t.parent.x,
                        linkParentY: t => t.parent.y + t.parent.height,
                        buttonX: t => t.width / 2,
                        buttonY: t => t.height,
                        centerTransform: ({
                            root: t, rootMargin: e,
                            centerY: n, scale: a,
                            centerX: i
                        }) => `translate(${i},${e}) scale(${a})`,
                        nodeFlexSize: ({
                            height: t,
                            width: e,
                            siblingsMargin: n,
                            childrenMargin: a,
                            state: i, node: o,
                            compactViewIndex: r
                        }) => {
                            if (i.compact && o.flexCompactDim) {
                                return [o.flexCompactDim[0], o.flexCompactDim[1]]
                            }
                            return [e + n, t + a]
                        },
                        zoomTransform: ({
                            centerX: t,
                            scale: e }) => `translate(${t},0}) scale(${e})`,
                        diagonal: this.diagonal.bind(this),
                        swap: t => { },
                        nodeUpdateTransform: ({
                            x: t,
                            y: e,
                            width: n,
                            height: a }) => `translate(${t - n / 2},${e})`
                    },
                    bottom: {
                        nodeLeftX: t => -t.width / 2,
                        nodeRightX: t => t.width / 2,
                        nodeTopY: t => -t.height,
                        nodeBottomY: t => 0,
                        nodeJoinX: t => t.x - t.width / 2,
                        nodeJoinY: t => t.y - t.height - t.height,
                        linkJoinX: t => t.x,
                        linkJoinY: t => t.y - t.height,
                        linkCompactXStart: t => t.x + (t.compactEven ? t.width / 2 : -t.width / 2),
                        linkCompactYStart: t => t.y - t.height / 2,
                        compactLinkMidX: (t, e) => t.firstCompactNode.x + t.firstCompactNode.flexCompactDim[0] / 4 + e.compactMarginPair(t) / 4,
                        compactLinkMidY: t => t.firstCompactNode.y,
                        linkX: t => t.x,
                        linkY: t => t.y,
                        compactDimension: {
                            sizeColumn: t => t.width,
                            sizeRow: t => t.height,
                            reverse: t => t
                        },
                        linkParentX: t => t.parent.x,
                        linkParentY: t => t.parent.y - t.parent.height,
                        buttonX: t => t.width / 2,
                        buttonY: t => 0,
                        centerTransform: ({
                            root: t,
                            rootMargin: e,
                            centerY: n,
                            scale: a,
                            centerX: i,
                            chartHeight: o
                        }) => `translate(${i},${o - e}) scale(${a})`,
                        nodeFlexSize: ({
                            height: t,
                            width: e,
                            siblingsMargin: n,
                            childrenMargin: a,
                            state: i, node: o
                        }) => {
                            if (i.compact && o.flexCompactDim) {
                                return [o.flexCompactDim[0], o.flexCompactDim[1]]
                            }
                            return [e + n, t + a]
                        },
                        zoomTransform: ({
                            centerX: t,
                            scale: e
                        }) => `translate(${t},0}) scale(${e})`,
                        diagonal: this.diagonal.bind(this),
                        swap: t => {
                            t.y = -t.y
                        },
                        nodeUpdateTransform: ({
                            x: t,
                            y: e,
                            width: n,
                            height: a
                        }) => `translate(${t - n / 2},${e - a})`
                    },
                    right: {
                        nodeLeftX: t => -t.width,
                        nodeRightX: t => 0,
                        nodeTopY: t => -t.height / 2,
                        nodeBottomY: t => t.height / 2,
                        nodeJoinX: t => t.x - t.width - t.width,
                        nodeJoinY: t => t.y - t.height / 2,
                        linkJoinX: t => t.x - t.width,
                        linkJoinY: t => t.y,
                        linkX: t => t.x,
                        linkY: t => t.y,
                        linkParentX: t => t.parent.x - t.parent.width,
                        linkParentY: t => t.parent.y,
                        buttonX: t => 0,
                        buttonY: t => t.height / 2,
                        linkCompactXStart: t => t.x - t.width / 2,
                        linkCompactYStart: t => t.y + (t.compactEven ? t.height / 2 : -t.height / 2),
                        compactLinkMidX: (t, e) => t.firstCompactNode.x,
                        compactLinkMidY: (t, e) => t.firstCompactNode.y + t.firstCompactNode.flexCompactDim[0] / 4 + e.compactMarginPair(t) / 4,
                        centerTransform: ({
                            root: t, rootMargin: e,
                            centerY: n,
                            scale: a,
                            centerX: i,
                            chartWidth: o
                        }) => `translate(${o - e},${n}) scale(${a})`,
                        nodeFlexSize: ({
                            height: t,
                            width: e,
                            siblingsMargin: n,
                            childrenMargin: a,
                            state: i,
                            node: o
                        }) => {
                            if (i.compact && o.flexCompactDim) {
                                return [o.flexCompactDim[0], o.flexCompactDim[1]]
                            }
                            return [t + n, e + a]
                        },
                        compactDimension: {
                            sizeColumn: t => t.height,
                            sizeRow: t => t.width,
                            reverse: t => t.slice().reverse()
                        },
                        zoomTransform: ({
                            centerY: t,
                            scale: e }) => `translate(0,${t}) scale(${e})`,
                        diagonal: this.hdiagonal.bind(this),
                        swap: t => { const e = t.x; t.x = -t.y, t.y = e },
                        nodeUpdateTransform: ({
                            x: t,
                            y: e,
                            width: n,
                            height: a
                        }) => `translate(${t - n},${e - a / 2})`
                    }
                }
            };
            this.getChartState = () => t, Object.keys(t).forEach((e => { this[e] = function (n) { return arguments.length ? (t[e] = n, this) : t[e] } })), this.initializeEnterExitUpdatePattern()
        }
        initializeEnterExitUpdatePattern() {
            d.selection.prototype.patternify = function (t) {
                var e = t.selector, n = t.tag, a = t.data || [e], i = this.selectAll("." + e).data(a, ((t, e) => "object" == typeof t && t.id ? t.id : e));
                return i.exit().remove(),
                    (i = i.enter().append(n).merge(i)).attr("class", e), i
            }
        }
        getNodeChildren({ data: t, children: e, _children: n }, a) {
            return a.push(t), e && e.forEach((t => {
                this.getNodeChildren(t, a)
            })), n && n.forEach((t => {
                this.getNodeChildren(t, a)
            })), a
        }
        initialZoom(t) {
            return this.getChartState().lastTransform.k = t, this
        }
        render() {
            const t = this.getChartState();
            if (!t.data || 0 == t.data.length)
                return console.log("ORG CHART - Data is empty"),
                    t.container && (e.select(t.container).select(".nodes-wrapper").remove(),
                        e.select(t.container).select(".links-wrapper").remove(),
                        e.select(t.container).select(".connections-wrapper").remove()),
                    this;
            const n = d.select(t.container),
                a = n.node().getBoundingClientRect();
            a.width > 0 && (t.svgWidth = a.width);
            const i = {
                id: `ID${Math.floor(1e6 * Math.random())}`,
                chartWidth: t.svgWidth,
                chartHeight: t.svgHeight
            };
            if (t.calc = i, i.centerX = i.chartWidth / 2, i.centerY = i.chartHeight / 2, t.firstDraw) {
                const e = { zoom: null };
                e.zoom = t.createZoom().clickDistance(10).on("start", ((e, n) => t.onZoomStart(e)))
                    .on("end", ((e, n) => t.onZoomEnd(e)))
                    .on("zoom", ((e, n) => {
                        t.onZoom(e),
                            this.zoomed(e, n)
                    })).scaleExtent(t.scaleExtent),
                    t.zoomBehavior = e.zoom
            }
            t.flexTreeLayout = o.flextree({
                nodeSize: e => {
                    const n = t.nodeWidth(e),
                        a = t.nodeHeight(e),
                        i = t.siblingsMargin(e),
                        o = t.childrenMargin(e);
                    return t.layoutBindings[t.layout].nodeFlexSize({
                        state: t,
                        node: e,
                        width: n,
                        height: a,
                        siblingsMargin: i,
                        childrenMargin: o
                    })
                }
            })
                .spacing(((e, n) => e.parent == n.parent ? 0 : t.neighbourMargin(e, n))), this.setLayouts({ expandNodesFirst: !1 });
            const r = n.patternify({ tag: "svg", selector: "svg-chart-container" })
                .attr("width", t.svgWidth)
                .attr("height", t.svgHeight)
                .attr("font-family", t.defaultFont);
            t.firstDraw && r.call(t.zoomBehavior)
                .on("dblclick.zoom", null)
                .attr("cursor", "move"),
                t.svg = r;
            const s = r.patternify({ tag: "g", selector: "chart" });
            return t.centerG = s.patternify({ tag: "g", selector: "center-group" }),
                t.linksWrapper = t.centerG.patternify({ tag: "g", selector: "links-wrapper" }),
                t.nodesWrapper = t.centerG.patternify({ tag: "g", selector: "nodes-wrapper" }),
                t.connectionsWrapper = t.centerG.patternify({ tag: "g", selector: "connections-wrapper" }),
                t.defsWrapper = r.patternify({ tag: "g", selector: "defs-wrapper" }),
                t.firstDraw && t.centerG.attr("transform", (() => t.layoutBindings[t.layout].centerTransform({
                    centerX: i.centerX,
                    centerY: i.centerY,
                    scale: t.lastTransform.k,
                    rootMargin: t.rootMargin,
                    root: t.root,
                    chartHeight: i.chartHeight,
                    chartWidth: i.chartWidth
                }))),
                t.chart = s,
                this.update(t.root),
                d.select(window)
                    .on(`resize.${t.id}`, (() => {
                        const e = d.select(t.container).node().getBoundingClientRect();
                        t.svg.attr("width", e.width)
                    })),
                t.firstDraw && (t.firstDraw = !1),
                this
        }
        addNode(t) {
            const e = this.getChartState(),
                n = e.generateRoot(e.data).descendants(),
                a = n.filter((({ data: n }) => e.nodeId(n).toString() === e.nodeId(t).toString()))[0],
                i = n.filter((({ data: n }) => e.nodeId(n).toString() === e.parentNodeId(t).toString()))[0];
            return a ? (
                console.log(`ORG CHART - ADD - Node with id "${e.nodeId(t)}" already exists in tree`),
                this
            ) : i ? (
                t._centered && !t._expanded && (t._expanded = !0),
                e.data.push(t), this.updateNodesState(),
                this
            ) : (
                console.log(`ORG CHART - ADD - Parent node with id "${e.parentNodeId(t)}" not found in the tree`),
                this
            )
        }
        removeNode(t) {
            const e = this.getChartState(),
                n = e.generateRoot(e.data).descendants().filter((({ data: n }) => e.nodeId(n) == t))[0];
            if (!n) return (
                console.log(`ORG CHART - REMOVE - Node with id "${t}" not found in the tree`),
                this
            );
            if (
                n.descendants().forEach((t => t.data._filteredOut = !0)),
                e.data = e.data.filter((t => !t._filteredOut)),
                0 == e.data.length) this.render();
            else {
                this.updateNodesState.bind(this)()
            }
            return this
        }
        groupBy(t, e, n) {
            const a = {};
            return t.forEach((t => {
                const n = e(t);
                a[n] || (a[n] = []),
                    a[n].push(t)
            })),
                Object.keys(a).forEach((t => {
                    a[t] = n(a[t])
                })),
                Object.entries(a)
        }
        calculateCompactFlexDimensions(t) {
            const e = this.getChartState();
            t.eachBefore((t => {
                t.firstCompact = null,
                    t.compactEven = null,
                    t.flexCompactDim = null,
                    t.firstCompactNode = null
            })),
                t.eachBefore((t => {
                    if (t.children && t.children.length > 1) {
                        const n = t.children.filter((t => !t.children));
                        if (n.length < 2) return;
                        n.forEach(((t, e) => {
                            e || (t.firstCompact = !0),
                                t.compactEven = !(e % 2),
                                t.row = Math.floor(e / 2)
                        }));
                        const a = d.max(n.filter((t => t.compactEven)), e.layoutBindings[e.layout].compactDimension.sizeColumn),
                            i = d.max(n.filter((t => !t.compactEven)), e.layoutBindings[e.layout].compactDimension.sizeColumn),
                            o = 2 * Math.max(a, i),
                            r = this.groupBy(n, (t => t.row), (t => d.max(t, (t => e.layoutBindings[e.layout].compactDimension.sizeRow(t) + e.compactMarginBetween(t))))),
                            s = d.sum(r.map((t => t[1])));
                        n.forEach((t => {
                            t.firstCompactNode = n[0],
                                t.firstCompact ? t.flexCompactDim = [o + e.compactMarginPair(t), s - e.compactMarginBetween(t)] : t.flexCompactDim = [0, 0]
                        })),
                            t.flexCompactDim = null
                    }
                }))
        }
        calculateCompactFlexPositions(t) {
            const e = this.getChartState();
            t.eachBefore((t => {
                if (t.children) {
                    const n = t.children.filter((t => t.flexCompactDim)),
                        a = n[0];
                    if (!a) return;
                    n.forEach(((t, n, i) => {
                        0 == n && (a.x -= a.flexCompactDim[0] / 2),
                            n & n % 2 - 1 ?
                                t.x = a.x + .25 * a.flexCompactDim[0] - e.compactMarginPair(t) / 4 :
                                n && (t.x = a.x + .75 * a.flexCompactDim[0] + e.compactMarginPair(t) / 4)
                    }));
                    const i = a.x + .5 * a.flexCompactDim[0];
                    a.x = a.x + .25 * a.flexCompactDim[0] - e.compactMarginPair(a) / 4;
                    const o = t.x - i;
                    Math.abs(o) < 10 &&
                        n.forEach((t => t.x += o));
                    const r = this.groupBy(n, (t => t.row), (t => d.max(t, (t => e.layoutBindings[e.layout].compactDimension.sizeRow(t))))),
                        s = d.cumsum(r.map((t => t[1] + e.compactMarginBetween(t))));
                    n.forEach(((t, e) => {
                        t.row ? t.y = a.y + s[t.row - 1] : t.y = a.y
                    }))
                }
            }))
        }
        update({ x0: t, y0: e, x: n = 0, y: a = 0, width: i, height: o }) {
            const r = this.getChartState();
            r.calc;
            r.compact && this.calculateCompactFlexDimensions(r.root);
            const s = r.flexTreeLayout(r.root);
            r.compact && this.calculateCompactFlexPositions(r.root);
            const l = s.descendants(),
                c = s.descendants().slice(1);
            l.forEach(r.layoutBindings[r.layout].swap);
            const h = r.connections, g = {};
            r.allNodes.forEach((t => g[r.nodeId(t.data)] = t));
            const p = {};
            l.forEach((t => p[r.nodeId(t.data)] = t)),
                h.forEach((t => {
                    const e = g[t.from], n = g[t.to];
                    t._source = e, t._target = n
                }));
            const u = h.filter((t => p[t.from] && p[t.to])),
                m = r.defs.bind(this)(r, u);
            m !== r.defsWrapper.html() && r.defsWrapper.html(m);
            const f = r.linksWrapper.selectAll("path.link").data(c, (t => r.nodeId(t.data))),
                y = f.enter().insert("path", "g").attr("class", "link").attr("d", (n => {
                    const a = {
                        x: r.layoutBindings[r.layout].linkJoinX({ x: t, y: e, width: i, height: o }),
                        y: r.layoutBindings[r.layout].linkJoinY({ x: t, y: e, width: i, height: o })
                    };
                    return r.layoutBindings[r.layout].diagonal(a, a, a)
                })).merge(f);
            y.attr("fill", "none"),
                this.isEdge() ?
                    y.style("display", (t => t.data._pagingButton ? "none" : "auto")) :
                    y.attr("display", (t => t.data._pagingButton ? "none" : "auto")),
                y.each(r.linkUpdate), y.transition().duration(r.duration).attr("d", (t => {
                    const e = r.compact && t.flexCompactDim ? {
                        x: r.layoutBindings[r.layout].compactLinkMidX(t, r),
                        y: r.layoutBindings[r.layout].compactLinkMidY(t, r)
                    } : {
                        x: r.layoutBindings[r.layout].linkX(t),
                        y: r.layoutBindings[r.layout].linkY(t)
                    },
                        n = {
                            x: r.layoutBindings[r.layout].linkParentX(t),
                            y: r.layoutBindings[r.layout].linkParentY(t)
                        },
                        a = r.compact && t.flexCompactDim ? {
                            x: r.layoutBindings[r.layout].linkCompactXStart(t),
                            y: r.layoutBindings[r.layout].linkCompactYStart(t)
                        } : e;
                    return r.layoutBindings[r.layout].diagonal(e, n, a, { sy: r.linkYOffset })
                }));
            f.exit().transition().duration(r.duration).attr("d", (t => {
                const e = {
                    x: r.layoutBindings[r.layout].linkJoinX({ x: n, y: a, width: i, height: o }),
                    y: r.layoutBindings[r.layout].linkJoinY({ x: n, y: a, width: i, height: o })
                };
                return r.layoutBindings[r.layout].diagonal(e, e, null, { sy: r.linkYOffset })
            })).remove();
            const x = r.connectionsWrapper.selectAll("path.connection").data(u),
                C = x.enter().insert("path", "g").attr("class", "connection").attr("d", (n => {
                    const a = {
                        x: r.layoutBindings[r.layout].linkJoinX({ x: t, y: e, width: i, height: o }),
                        y: r.layoutBindings[r.layout].linkJoinY({ x: t, y: e, width: i, height: o })
                    };
                    return r.layoutBindings[r.layout].diagonal(a, a, null, { sy: r.linkYOffset })
                })).merge(x);
            C.attr("fill", "none"),
                C.transition().duration(r.duration).attr("d", (t => {
                    const e = r.layoutBindings[r.layout].linkX({
                        x: t._source.x,
                        y: t._source.y,
                        width: t._source.width,
                        height: t._source.height
                    }),
                        n = r.layoutBindings[r.layout].linkY({ x: t._source.x, y: t._source.y, width: t._source.width, height: t._source.height }),
                        a = r.layoutBindings[r.layout].linkJoinX({ x: t._target.x, y: t._target.y, width: t._target.width, height: t._target.height }),
                        i = r.layoutBindings[r.layout].linkJoinY({ x: t._target.x, y: t._target.y, width: t._target.width, height: t._target.height });
                    return r.linkGroupArc({ source: { x: e, y: n }, target: { x: a, y: i } })
                })),
                C.each(r.connectionsUpdate);
            x.exit().transition().duration(r.duration).attr("opacity", 0).remove();
            const w = r.nodesWrapper.selectAll("g.node").data(l, (({ data: t }) => r.nodeId(t))),
                v = w.enter().append("g").attr("class", "node")
                    .attr("transformtransform", (n => {
                        if (n == r.root)
                            return `translate(${t},${e})`;
                        return `translate(${r.layoutBindings[r.layout].nodeJoinX({ x: t, y: e, width: i, height: o })},${r.layoutBindings[r.layout].nodeJoinY({ x: t, y: e, width: i, height: o })})`
                    }))
                    .attr("cursor", "pointer")
                    .on("click.node", ((t, e) => {
                        const { data: n } = e;
                        [...t.srcElement.classList].includes("node-button-foreign-object") ||
                            ([...t.srcElement.classList].includes("paging-button-wrapper") ? this.loadPagingNodes(e) : n._pagingButton ? console.log("event fired, no handlers") : r.onNodeClick(e))
                    }))
                    .on("keydown.node", ((t, e) => {
                        const { data: n } = e;
                        if ("Enter" === t.key || " " === t.key || "Spacebar" === t.key) {
                            if ([...t.srcElement.classList].includes("node-button-foreign-object")) return;
                            if ([...t.srcElement.classList].includes("paging-button-wrapper")) return void this.loadPagingNodes(e);
                            "Enter" !== t.key && " " !== t.key && "Spacebar" !== t.key || this.onButtonClick(t, e)
                        }
                    }));
            v.patternify({ tag: "rect", selector: "node-rect", data: t => [t] });
            const k = v.merge(w).style("font", "12px sans-serif");
            k.patternify({ tag: "foreignObject", selector: "node-foreign-object", data: t => [t] }).style("overflow", "visible").patternify({ tag: "xhtml:div", selector: "node-foreign-object-div", data: t => [t] }), this.restyleForeignObjectElements();
            const E = v.patternify({ tag: "g", selector: "node-button-g", data: t => [t] }).on("click", ((t, e) => this.onButtonClick(t, e)));
            E.patternify({ tag: "rect", selector: "node-button-rect", data: t => [t] })
                .attr("opacity", 0).attr("pointer-events", "all").attr("width", (t => r.nodeButtonWidth(t)))
                .attr("height", (t => r.nodeButtonHeight(t)))
                .attr("x", (t => r.nodeButtonX(t)))
                .attr("y", (t => r.nodeButtonY(t)));
            E.patternify({ tag: "foreignObject", selector: "node-button-foreign-object", data: t => [t] })
                .attr("width", (t => r.nodeButtonWidth(t)))
                .attr("height", (t => r.nodeButtonHeight(t)))
                .attr("x", (t => r.nodeButtonX(t)))
                .attr("y", (t => r.nodeButtonY(t)))
                .style("overflow", "visible")
                .patternify({ tag: "xhtml:div", selector: "node-button-div", data: t => [t] })
                .style("pointer-events", "none")
                .style("display", "flex").style("width", "100%")
                .style("height", "100%");
            k.transition()
                .attr("opacity", 0)
                .duration(r.duration)
                .attr("transform", (({ x: t, y: e, width: n, height: a }) =>
                    r.layoutBindings[r.layout].nodeUpdateTransform({ x: t, y: e, width: n, height: a })))
                .attr("opacity", 1),
                k.select(".node-rect")
                    .attr("width", (({ width: t }) => t))
                    .attr("height", (({ height: t }) => t))
                    .attr("x", (({ width: t }) => 0))
                    .attr("y", (({ height: t }) => 0))
                    .attr("cursor", "pointer")
                    .attr("rx", 3)
                    .attr("fill", r.nodeDefaultBackground),
                k.select(".node-button-g")
                    .attr("transform", (({ data: t, width: e, height: n }) =>
                        `translate(${r.layoutBindings[r.layout].buttonX({ width: e, height: n })},${r.layoutBindings[r.layout].buttonY({ width: e, height: n })})`))
                    .attr("display", (({ data: t }) => t._directSubordinates > 0 ? null : "none"))
                    .attr("opacity", (({ data: t, children: e, _children: n }) =>
                        t._pagingButton ? 0 : e || n ? 1 : 0)),
                k.select(".node-button-foreign-object .node-button-div")
                    .html((t => r.buttonContent({ node: t, state: r }))),
                k.select(".node-button-text")
                    .attr("text-anchor", "middle")
                    .attr("alignment-baseline", "middle")
                    .attr("font-size", (({ children: t }) => t ? 40 : 26)).text((({ children: t }) => t ? "-" : "+"))
                    .attr("y", this.isEdge() ? 10 : 0),
                k.each(r.nodeUpdate);
            const B = w.exit(),
                b = B.data().reduce(((t, e) =>
                    t.depth < e.depth ? t : e), { depth: 1 / 0 });
            B.attr("opacity", 1)
                .transition()
                .duration(r.duration)
                .attr("transform", (t => {
                    let { x: e, y: n, width: a, height: i } = b.parent || {};
                    return `translate(${r.layoutBindings[r.layout].nodeJoinX({ x: e, y: n, width: a, height: i })},${r.layoutBindings[r.layout].nodeJoinY({ x: e, y: n, width: a, height: i })})`
                }))
                .on("end", (function () { d.select(this).remove() }))
                .attr("opacity", 0),
                l.forEach((t => { t.x0 = t.x, t.y0 = t.y }));
            const _ = r.allNodes.filter((t => t.data._centered))[0];
            if (_) {
                let t = [_];
                _.data._centeredWithDescendants && (t = r.compact ? _.descendants().filter(((t, e) => e < 7)) : _.descendants().filter(((t, e, n) => {
                    const a = Math.round(n.length / 2);
                    return n.length % 2 ? e > a - 2 && e < a + 2 - 1 : e > a - 2 && e < a + 2
                }))),
                    _.data._centeredWithDescendants = null,
                    _.data._centered = null,
                    this.fit({
                        animate: !0, scale: !1, nodes: t
                    })
            }
        }
        isEdge() {
            return window.navigator.userAgent.includes("Edge")
        }
        hdiagonal(t, e, n, a) {
            return this.getChartState().hdiagonal(t, e, n, a)
        }
        diagonal(t, e, n, a) {
            return this.getChartState().diagonal(t, e, n, a)
        }
        restyleForeignObjectElements() {
            const t = this.getChartState();
            t.svg.selectAll(".node-foreign-object")
                .attr("width", (({ width: t }) => t)).attr("height", (({ height: t }) => t))
                .attr("x", (({ width: t }) => 0))
                .attr("y", (({ height: t }) => 0)),
                t.svg.selectAll(".node-foreign-object-div")
                    .style("width", (({ width: t }) => `${t}px`))
                    .style("height", (({ height: t }) => `${t}px`))
                    .html((function (e, n, a) {
                        return e.data._pagingButton
                            ? `<div class="paging-button-wrapper"><div style="pointer-events:none">${t.pagingButton(e, n, a, t)}</div></div>`
                            : t.nodeContent.bind(this)(e, n, a, t)
                    }))
        }
        onButtonClick(t, e) {
            const n = this.getChartState();
            e.data._pagingButton ||
                (n.setActiveNodeCentered && (e.data._centered = !0, e.data._centeredWithDescendants = !0),
                    e.children ? (e._children = e.children, e.children = null, this.setExpansionFlagToChildren(e, !1)) :
                        (e.children = e._children, e._children = null,
                            e.children && e.children.forEach((({ data: t }) => t._expanded = !0))),
                    this.update(e), t.stopPropagation(), n.onExpandOrCollapse(e))
        }
        setExpansionFlagToChildren({ data: t, children: e, _children: n }, a) {
            t._expanded = a,
                e && e.forEach((t => { this.setExpansionFlagToChildren(t, a) })),
                n && n.forEach((t => { this.setExpansionFlagToChildren(t, a) }))
        }
        expandSomeNodes(t) {
            if (t.data._expanded) {
                let e = t.parent;
                for (; e && e._children;)e.children = e._children, e._children = null, e = e.parent
            }
            t._children && t._children.forEach((t => this.expandSomeNodes(t))),
                t.children && t.children.forEach((t => this.expandSomeNodes(t)))
        } 
        updateNodesState() {
            const t = this.getChartState();
            this.setLayouts({ expandNodesFirst: !0 }),
                this.update(t.root)
        }
        setLayouts({ expandNodesFirst: t = !0 }) {
            const e = this.getChartState();
            e.generateRoot = d.stratify().id((t => e.nodeId(t))).parentId((t => e.parentNodeId(t))),
                e.root = e.generateRoot(e.data);
            const n = e.root.descendants();
            e.initialExpandLevel > 1 && n.length > 0 && (n.forEach((t => { t.depth <= e.initialExpandLevel && (t.data._expanded = !0) })), e.initialExpandLevel = 1);
            const a = {}; e.root.descendants().filter((t => t.children)).filter((t => !t.data._pagingStep)).forEach((t => { t.data._pagingStep = e.minPagingVisibleNodes(t) })),
                e.root.eachBefore(((t, e) => {
                    t.data._directSubordinatesPaging = t.children ? t.children.length : 0,
                        t.children && t.children.forEach(((e, n) => {
                            if (e.data._pagingButton = !1, n > t.data._pagingStep && (a[e.id] = !0),
                                n === t.data._pagingStep && t.children.length - 1 > t.data._pagingStep && (e.data._pagingButton = !0),
                                a[e.parent.id] && (a[e.id] = !0),
                                e.data._expanded || e.data._centered || e.data._highlighted || e.data._upToTheRootHighlighted) {
                                let t = e;
                                for (; t && (a[t.id] || t.data._pagingButton);)
                                    a[t.id] = !1,
                                        t.data._pagingButton &&
                                        (t.data._pagingButton = !1, t.parent.children.forEach((t => { t.data._expanded = !0, a[t.id] = !1 }))),
                                        t = t.parent
                            }
                        }))
                })),
                e.root = d.stratify().id((t => e.nodeId(t))).parentId((t => e.parentNodeId(t)))(e.data.filter((t => !0 !== a[t.id]))),
                e.root.each(((t, n, a) => {
                    let i = t._hierarchyHeight || t.height,
                        o = e.nodeWidth(t),
                        r = e.nodeHeight(t);
                    Object.assign(t, { width: o, height: r, _hierarchyHeight: i })
                })),
                e.root.x0 = 0,
                e.root.y0 = 0,
                e.allNodes = e.root.descendants(),
                e.allNodes.forEach((t => {
                    Object.assign(t.data, {
                        _directSubordinates: t.children ? t.children.length : 0,
                        _totalSubordinates: t.descendants().length - 1
                    })
                })),
                e.root.children && (t && e.root.children.forEach(this.expand),
                    e.root.children.forEach((t => this.collapse(t))),
                    0 == e.initialExpandLevel && (e.root._children = e.root.children, e.root.children = null),
                    [e.root].forEach((t => this.expandSomeNodes(t))))
        }
        collapse(t) {
            t.children && (t._children = t.children,
                t._children.forEach((t => this.collapse(t))),
                t.children = null)
        }
        expand(t) {
            t._children && (t.children = t._children, t.children.forEach((t => this.expand(t))), t._children = null)
        }
        zoomed(t, e) {
            const n = this.getChartState(),
                a = n.chart,
                i = t.transform;
            n.lastTransform = i,
                a.attr("transform", i),
                this.isEdge() && this.restyleForeignObjectElements()
        }
        zoomTreeBounds({ x0: t, x1: e, y0: n, y1: a, params: i = { animate: !0, scale: !0, onCompleted: () => { } } }) {
            const { centerG: o, svgWidth: r, svgHeight: s, svg: l, zoomBehavior: c, duration: h, lastTransform: g } = this.getChartState();
            let p = Math.min(8, .9 / Math.max((e - t) / r, (a - n) / s)),
                u = d.zoomIdentity.translate(r / 2, s / 2);
            u = u.scale(i.scale ? p : g.k),
                u = u.translate(-(t + e) / 2, -(n + a) / 2),
                l.transition().duration(i.animate ? h : 0).call(c.transform, u),
                o.transition().duration(i.animate ? h : 0).attr("transform", "translate(0,0)").on("end", (function () { i.onCompleted && i.onCompleted() }))
        }
        fit({ animate: t = !0, nodes: e, scale: n = !0, onCompleted: a = (() => { }) } = {}) {
            const i = this.getChartState(),
                { root: o } = i;
            let r = e || o.descendants();
            const
                s = d.min(r, (t => t.x + i.layoutBindings[i.layout].nodeLeftX(t))),
                l = d.max(r, (t => t.x + i.layoutBindings[i.layout].nodeRightX(t))),
                c = d.min(r, (t => t.y + i.layoutBindings[i.layout].nodeTopY(t))),
                h = d.max(r, (t => t.y + i.layoutBindings[i.layout].nodeBottomY(t)));
            return this.zoomTreeBounds({ params: { animate: t, scale: n, onCompleted: a }, x0: s - 50, x1: l + 50, y0: c - 50, y1: h + 50 }), this
        }
        loadPagingNodes(t) {
            const e = this.getChartState();
            t.data._pagingButton = !1;
            const n = t.parent.data._pagingStep + e.pagingStep(t.parent);
            t.parent.data._pagingStep = n,
                this.updateNodesState()
        }
        setExpanded(t, e = !0) {
            const n = this.getChartState(),
                a = n.allNodes.filter((({ data: e }) => n.nodeId(e) == t))[0];
            if (!a) return console.log(`ORG CHART - ${e ? "EXPAND" : "COLLAPSE"} - Node with id (${t})  not found in the tree`), this;
            if (a.data._expanded = e, 0 == e) {
                const t = a.parent || { descendants: () => [] };
                t.descendants().filter((e => e != t)).forEach((t => t.data._expanded = !1))
            }
            return this
        }
        setCentered(t) {
            const e = this.getChartState(),
                n = e.generateRoot(e.data).descendants().filter((({ data: n }) => e.nodeId(n).toString() == t.toString()))[0]; if (!n) return console.log(`ORG CHART - CENTER - Node with id (${t}) not found in the tree`), this;
            return n.ancestors().forEach((t => t.data._expanded = !0)), n.data._centered = !0, n.data._expanded = !0,
                this
        }
        setHighlighted(t) {
            const e = this.getChartState(),
                n = e.generateRoot(e.data).descendants().filter((n => e.nodeId(n.data).toString() === t.toString()))[0]; if (!n) return console.log(`ORG CHART - HIGHLIGHT - Node with id (${t})  not found in the tree`), this;
            return n.ancestors().forEach((t => t.data._expanded = !0)), n.data._highlighted = !0, n.data._expanded = !0, n.data._centered = !0,
                this
        }
        setUpToTheRootHighlighted(t) {
            const e = this.getChartState(),
                n = e.generateRoot(e.data).descendants().filter((n => e.nodeId(n.data).toString() === t.toString()))[0]; if (!n) return console.log(`ORG CHART - HIGHLIGHTROOT - Node with id (${t}) not found in the tree`), this;
            return n.ancestors().forEach((t => t.data._expanded = !0)), n.data._upToTheRootHighlighted = !0, n.data._expanded = !0, n.ancestors().forEach((t => t.data._upToTheRootHighlighted = !0)),
                this
        }
        clearHighlighting() {
            const t = this.getChartState();
            return t.allNodes.forEach((t => {
                t.data._highlighted = !1,
                    t.data._upToTheRootHighlighted = !1
            })), this.update(t.root),
                this
        }
        fullscreen(t) {
            const e = this.getChartState(),
                n = d.select(t || e.container).node(); d.select(document).on("fullscreenchange." + e.id, (function (t) { (document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement) == n ? setTimeout((t => { e.svg.attr("height", window.innerHeight - 40) }), 500) : e.svg.attr("height", e.svgHeight) })), n.requestFullscreen ? n.requestFullscreen() : n.mozRequestFullScreen ? n.mozRequestFullScreen() : n.webkitRequestFullscreen ? n.webkitRequestFullscreen() : n.msRequestFullscreen && n.msRequestFullscreen()
        }
        zoomIn() {
            const { svg: t, zoomBehavior: e } = this.getChartState();
            t.transition().call(e.scaleBy, 1.3)
        }
        zoomOut() {
            const { svg: t, zoomBehavior: e } = this.getChartState();
            t.transition().call(e.scaleBy, .78)
        }
        toDataURL(t, e) {
            var n = new XMLHttpRequest; n.onload = function () {
                var t = new FileReader;
                t.onloadend = function () { e(t.result) },
                    t.readAsDataURL(n.response)
            },
                n.open("GET", t),
                n.responseType = "blob", n.send()
        }
        exportImg({ full: t = !1, scale: e = 3, onLoad: n = (t => t), save: a = !0, backgroundColor: i = "#FAFAFA" } = {}) {
            const o = this,
                r = this.getChartState(),
                { svg: d, root: s } = r;
            let l = 0; const c = d.selectAll("img");
            let h = c.size();
            const g = () => {
                JSON.parse(JSON.stringify(o.lastTransform()));
                const d = o.duration();
                t && o.fit(); const { svg: l } = o.getChartState();
                setTimeout((t => {
                    o.downloadImage({
                        node: l.node(),
                        scale: e,
                        isSvg: !1,
                        backgroundColor: i,
                        onAlreadySerialized: t => {
                            o.update(s)
                        },
                        imageName: r.imageName,
                        onLoad: n, save: a
                    })
                }), t ? d + 10 : 0)
            };
            h > 0 ? c.each((function () {
                o.toDataURL(this.src, (t => {
                    this.src = t, ++l == h && g()
                }))
            })) : g()
        }
        exportSvg() {
            const { svg: t, imageName: e } = this.getChartState();
            return this.downloadImage({
                imageName: e,
                node: t.node(),
                scale: 3,
                isSvg: !0
            }),
                this
        }
        expandAll() {
            const {
                allNodes: t,
                root: e,
                data: n
            } = this.getChartState();
            return n.forEach((t => t._expanded = !0)),
                this.render(),
                this
        }
        collapseAll() {
            const { allNodes: t, root: e } = this.getChartState();
            return t.forEach((t => t.data._expanded = !1)),
                this.initialExpandLevel(1),
                this.render(),
                this
        }
        
        downloadImage({ node: t, scale: e = 2, imageName: n = "graph", isSvg: a = !1, save: i = !0, backgroundColor: o = "#FAFAFA", onAlreadySerialized: r = (t => { }), onLoad: d = (t => { }) }) {
            const s = t;
            function l(t, e) {
                var n = document.createElement("a");
                "string" == typeof n.download ? (document.body.appendChild(n),
                    n.download = e,
                    n.href = t,
                    n.click(),
                    document.body.removeChild(n)) : location.replace(t)
            }
            function c(t) {
                const e = "http://www.w3.org/2000/xmlns/"; t = t.cloneNode(!0);
                const n = window.location.href + "#",
                    a = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, null, !1);
                for (; a.nextNode();)for (const t of a.currentNode.attributes) t.value.includes(n) && (t.value = t.value.replace(n, "#"));
                t.setAttributeNS(e, "xmlns", "http://www.w3.org/2000/svg"),
                    t.setAttributeNS(e, "xmlns:xlink", "http://www.w3.org/1999/xlink");
                return (new XMLSerializer).serializeToString(t)
            }
            if (a) {
                let t = c(s);
                return t = '<?xml version="1.0" standalone="no"?>\r\n' + t,
                    l(p = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(t), n + ".svg"),
                    void r()
            }
            const h = e,
                g = document.createElement("img");
            g.onload = function () {
                const t = document.createElement("canvas"),
                e = s.getBoundingClientRect();
                t.width = e.width * h,
                    t.height = e.height * h;
                const a = t.getContext("2d");
                a.fillStyle = o,
                    a.fillRect(0, 0, e.width * h, e.height * h),
                    a.drawImage(g, 0, 0, e.width * h, e.height * h);
                let r = t.toDataURL("image/png");
                d && d(r), i && l(r, n + ".png")
            };
            var p = "data:image/svg+xml; charset=utf8, " + encodeURIComponent(c(s));
            r(), g.src = p
        }
        getTextWidth(t, {
            fontSize: e = 14,
            fontWeight: n = 400,
            defaultFont: a = "Helvetice",
            ctx: i
        } = {}) {
            i.font = `${n || ""} ${e}px ${a} `;
            return i.measureText(t).width
        }
        clear() {
            const t = this.getChartState();
            d.select(window).on(`resize.${t.id}`, null),
                t.svg && t.svg.selectAll("*").remove()
        }
    }, Object.defineProperty(t, "__esModule", { value: !0 })
}));
//# sourceMappingURL=/sm/e1289df28f4fd51ce1d99d7eb615312b029e96fcc1e4a0823f9e770377c13d5c.map