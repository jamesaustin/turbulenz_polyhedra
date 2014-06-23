var hexahedron = {
    name: "hexahedron",
    vertexBuffer: null,
    indexBuffer: null,
    init: function initFn(size, colors) {
        var r = colors[0][0],
            g = colors[0][1],
            b = colors[0][2],
            a = colors[0][3];
        this.vertexBuffer = graphicsDevice.createVertexBuffer({
            numVertices: 24,
            attributes: ['FLOAT3', 'FLOAT3', 'UBYTE4N'],
            dynamic: false,
            data: [
                -size, -size,  size,  0.0,  0.0,  1.0, r, g, b, a,
                 size, -size,  size,  0.0,  0.0,  1.0, r, g, b, a,
                 size,  size,  size,  0.0,  0.0,  1.0, r, g, b, a,
                -size,  size,  size,  0.0,  0.0,  1.0, r, g, b, a,
                -size,  size,  size,  0.0,  1.0,  0.0, r, g, b, a,
                 size,  size,  size,  0.0,  1.0,  0.0, r, g, b, a,
                 size,  size, -size,  0.0,  1.0,  0.0, r, g, b, a,
                -size,  size, -size,  0.0,  1.0,  0.0, r, g, b, a,
                -size,  size, -size,  0.0,  0.0, -1.0, r, g, b, a,
                 size,  size, -size,  0.0,  0.0, -1.0, r, g, b, a,
                 size, -size, -size,  0.0,  0.0, -1.0, r, g, b, a,
                -size, -size, -size,  0.0,  0.0, -1.0, r, g, b, a,
                -size, -size, -size,  0.0, -1.0,  0.0, r, g, b, a,
                 size, -size, -size,  0.0, -1.0,  0.0, r, g, b, a,
                 size, -size,  size,  0.0, -1.0,  0.0, r, g, b, a,
                -size, -size,  size,  0.0, -1.0,  0.0, r, g, b, a,
                 size, -size,  size,  1.0,  0.0,  0.0, r, g, b, a,
                 size, -size, -size,  1.0,  0.0,  0.0, r, g, b, a,
                 size,  size, -size,  1.0,  0.0,  0.0, r, g, b, a,
                 size,  size,  size,  1.0,  0.0,  0.0, r, g, b, a,
                -size, -size, -size, -1.0,  0.0,  0.0, r, g, b, a,
                -size, -size,  size, -1.0,  0.0,  0.0, r, g, b, a,
                -size,  size,  size, -1.0,  0.0,  0.0, r, g, b, a,
                -size,  size, -size, -1.0,  0.0,  0.0, r, g, b, a
            ]
        });
        this.indexBuffer = graphicsDevice.createIndexBuffer({
            numIndices: 36,
            format: 'USHORT',
            dynamic: false,
            data: [
                2, 0, 1,
                3, 0, 2,
                6, 4, 5,
                7, 4, 6,
                10, 8, 9,
                11, 8, 10,
                14, 12, 13,
                15, 12, 14,
                18, 16, 17,
                19, 16, 18,
                22, 20, 21,
                23, 20, 22
            ]
        });
    }
}
