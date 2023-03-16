//
//  FontColorView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI
import SparkTokens

struct FontColorRow: View {
    var label: String
    var color: Color
    
    var body: some View {
        HStack {
            Text("Aa")
                .font(.title)
                .foregroundColor(color)
            VStack(alignment: .leading) {
                Text(label)
                    .foregroundColor(color)
            }
            .padding(.leading, Size.paddingMd)
            Spacer()
        }
        .padding(Size.paddingMd)
    }
}

struct FontColorView: View {
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    Group {
                        FontColorRow(label:"Primary", color:Color.brandPrimary)
                        FontColorRow(label:"Secondary", color:Color.brandSecondary)
                    }
                    Group {
                        FontColorRow(label:"Success", color:Color.brandSuccess)
                        FontColorRow(label:"Alert", color:Color.brandAlert)
                        FontColorRow(label:"Error", color:Color.brandError)
                        FontColorRow(label:"Info", color:Color.brandInfo)
                        FontColorRow(label:"Neutral", color:Color.brandNeutral)
                    }
                }
            }
        }
        .navigationBarTitle("Font Colors")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandOnPrimary)
    }
}

struct FontColorView_Previews: PreviewProvider {
    static var previews: some View {
        FontColorView()
    }
}
